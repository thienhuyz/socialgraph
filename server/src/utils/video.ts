import path from 'path'
import { mkdir } from 'fs/promises'
import { spawn } from 'child_process'

// Các mức chất lượng: chiều cao + bitrate video (bit/s). Muốn thêm/bớt mức thì sửa ở đây.
const LADDER = [
  { height: 360, bitrate: 800_000 },
  { height: 480, bitrate: 1_400_000 },
  { height: 720, bitrate: 2_800_000 },
  { height: 1080, bitrate: 5_000_000 }
]

// Chạy một lệnh (ffmpeg / ffprobe) và trả về chữ nó in ra
const run = (cmd: string, args: string[]) =>
  new Promise<string>((resolve, reject) => {
    const p = spawn(cmd, args, { windowsHide: true })
    let out = ''
    let err = ''
    p.stdout.on('data', (d) => (out += d))
    p.stderr.on('data', (d) => (err += d))
    p.on('error', reject)
    p.on('close', (code) => (code === 0 ? resolve(out.trim()) : reject(new Error(err || `${cmd} lỗi, mã ${code}`))))
  })

// Đo video: chiều cao, bitrate (0 nếu không đọc được), có audio hay không
const probe = async (file: string) => {
  const info = await run('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-show_entries',
    'stream=height,bit_rate',
    '-of',
    'json',
    file
  ])
  const stream = JSON.parse(info).streams?.[0]
  if (!stream) throw new Error('Không tìm thấy luồng video')

  const audio = await run('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'a:0',
    '-show_entries',
    'stream=codec_type',
    '-of',
    'csv=p=0',
    file
  ])
  return {
    height: Number(stream.height),
    bitrate: Number(stream.bit_rate) || 0,
    hasAudio: audio === 'audio'
  }
}

export const encodeHLSWithMultipleVideoStreams = async (inputPath: string, outDir = path.dirname(inputPath)) => {
  const { height, bitrate, hasAudio } = await probe(inputPath)

  // 1. Chọn các mức không lớn hơn video gốc (không phóng to). Luôn có ít nhất 1 mức.
  let levels = LADDER.filter((l) => l.height <= height)
  if (levels.length === 0) {
    levels = [{ height: height - (height % 2), bitrate: LADDER[0].bitrate }]
  }
  // Bitrate không vượt quá video gốc (mức nhỏ hơn thì giảm theo tỉ lệ chiều cao)
  levels = levels.map((l) => ({
    ...l,
    bitrate: bitrate ? Math.round(Math.min(l.bitrate, (bitrate * l.height) / height)) : l.bitrate
  }))

  // 2. Bộ lọc: nhân video thành N bản rồi thu nhỏ từng bản (giữ tỉ lệ, chiều rộng tự làm chẵn)
  const split = `[0:v]split=${levels.length}` + levels.map((_, i) => `[s${i}]`).join('')
  const scales = levels.map((l, i) => `[s${i}]scale=-2:${l.height}[o${i}]`).join(';')

  const args = ['-y', '-i', inputPath, '-filter_complex', `${split};${scales}`]

  // 3. Mỗi mức = 1 video (+ 1 audio nếu có)
  levels.forEach((l, i) => {
    args.push('-map', `[o${i}]`)
    if (hasAudio) args.push('-map', '0:a:0')
    args.push(
      `-b:v:${i}`,
      `${l.bitrate}`,
      `-maxrate:v:${i}`,
      `${Math.round(l.bitrate * 1.07)}`,
      `-bufsize:v:${i}`,
      `${l.bitrate * 2}`
    )
  })

  // 4. Cài đặt chung: H.264, nén nhanh, định dạng màu phát được mọi nơi, khung mốc đều nhau giữa các mức
  args.push(
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-pix_fmt',
    'yuv420p',
    '-g',
    '48',
    '-keyint_min',
    '48',
    '-sc_threshold',
    '0',
    '-c:a',
    'aac',
    '-b:a',
    '128k'
  )

  // 5. Xuất HLS: ghép video + audio thành từng nhóm, tạo master.m3u8
  const streamMap = levels.map((_, i) => (hasAudio ? `v:${i},a:${i}` : `v:${i}`)).join(' ')
  const toUnix = (p: string) => p.replace(/\\/g, '/')

  await Promise.all(levels.map((_, i) => mkdir(path.join(outDir, `v${i}`), { recursive: true })))

  args.push(
    '-var_stream_map',
    streamMap,
    '-master_pl_name',
    'master.m3u8',
    '-f',
    'hls',
    '-hls_time',
    '6',
    '-hls_list_size',
    '0',
    '-hls_segment_filename',
    toUnix(path.join(outDir, 'v%v', 'fileSequence%d.ts')),
    toUnix(path.join(outDir, 'v%v', 'prog_index.m3u8'))
  )

  await run('ffmpeg', args)
  return true
}
