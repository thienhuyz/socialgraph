import path from 'path'
import { spawn } from 'child_process'

const MAXIMUM_BITRATE_720P = 5 * 10 ** 6 // 5Mbps
const MAXIMUM_BITRATE_1080P = 8 * 10 ** 6 // 8Mbps
const MAXIMUM_BITRATE_1440P = 16 * 10 ** 6 // 16Mbps

const runCommand = (command: string, args: string[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { windowsHide: true })
    let stdout = ''
    let stderr = ''

    process.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    process.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    process.on('close', (code) => {
      if (code === 0) {
        resolve(stdout)
      } else {
        reject(new Error(`Command ${command} failed with code ${code}:\n${stderr || stdout}`))
      }
    })

    process.on('error', (err) => {
      reject(err)
    })
  })
}

export const checkVideoHasAudio = async (filePath: string) => {
  try {
    const stdout = await runCommand('ffprobe', [
      '-v',
      'error',
      '-select_streams',
      'a:0',
      '-show_entries',
      'stream=codec_type',
      '-of',
      'default=nw=1:nk=1',
      filePath
    ])
    return stdout.trim() === 'audio'
  } catch {
    return false
  }
}

export const getBitrate = async (filePath: string) => {
  try {
    const stdout = await runCommand('ffprobe', [
      '-v',
      'error',
      '-select_streams',
      'v:0',
      '-show_entries',
      'stream=bit_rate',
      '-of',
      'default=nw=1:nk=1',
      filePath
    ])
    const bitrate = Number(stdout.trim())
    if (bitrate && !isNaN(bitrate)) return bitrate

    const formatStdout = await runCommand('ffprobe', [
      '-v',
      'error',
      '-show_entries',
      'format=bit_rate',
      '-of',
      'default=nw=1:nk=1',
      filePath
    ])
    return Number(formatStdout.trim()) || 2 * 10 ** 6
  } catch {
    return 2 * 10 ** 6
  }
}

export const getResolution = async (filePath: string) => {
  const stdout = await runCommand('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-show_entries',
    'stream=width,height',
    '-of',
    'csv=s=x:p=0',
    filePath
  ])
  return stdout.trim()
}

export const encodeHLSWithMultipleVideoStreams = async (inputPath: string) => {
  const [bitrate, resolution, isHasAudio] = await Promise.all([
    getBitrate(inputPath),
    getResolution(inputPath),
    checkVideoHasAudio(inputPath)
  ])

  const parent_folder = path.join(inputPath, '..')
  // Chuẩn FFmpeg HLS đa stream: file danh sách từng phân giải phải có %v (ví dụ: v%v/prog_index.m3u8)
  const outputSegmentPath = path.join(parent_folder, 'v%v', 'fileSequence%d.ts').replace(/\\/g, '/')
  const variantPlaylistPath = path.join(parent_folder, 'v%v', 'prog_index.m3u8').replace(/\\/g, '/')

  const args: string[] = [
    '-y',
    '-i',
    inputPath,
    '-filter_complex',
    '[0:v]split=3[v1][v2][v3];[v1]copy[v1out];[v2]scale=w=1280:h=720:force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2[v2out];[v3]scale=w=854:h=480:force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2[v3out]',
    '-map',
    '[v1out]'
  ]

  if (isHasAudio) {
    args.push('-map', '0:a:0')
  }

  args.push('-map', '[v2out]')

  if (isHasAudio) {
    args.push('-map', '0:a:0')
  }

  args.push('-map', '[v3out]')

  if (isHasAudio) {
    args.push('-map', '0:a:0')
  }

  const bitrate720 = bitrate > MAXIMUM_BITRATE_720P ? MAXIMUM_BITRATE_720P : bitrate
  const bitrate480 = Math.min(bitrate, 1400 * 1000)

  args.push(
    '-c:v:0',
    'libx264',
    '-b:v:0',
    `${bitrate}`,
    '-c:v:1',
    'libx264',
    '-b:v:1',
    `${bitrate720}`,
    '-c:v:2',
    'libx264',
    '-b:v:2',
    `${bitrate480}`,
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    '-var_stream_map'
  )

  if (isHasAudio) {
    args.push('v:0,a:0 v:1,a:1 v:2,a:2')
  } else {
    args.push('v:0 v:1 v:2')
  }

  args.push(
    '-master_pl_name',
    'master.m3u8',
    '-f',
    'hls',
    '-hls_time',
    '6',
    '-hls_list_size',
    '0',
    '-hls_segment_filename',
    outputSegmentPath,
    variantPlaylistPath
  )

  await runCommand('ffmpeg', args)
  return true
}
