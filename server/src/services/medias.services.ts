import { Request } from 'express'
import { BASE_URL } from '~/utils/config'
import { handleUploadImage, handleUploadSingleImage, handleUploadVideo } from '~/utils/file'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import path from 'path'
import fs from 'fs'
import { Media } from '~/models/types/Media.types'
import { MediaType } from '~/constants/enums'
import { ErrorWithStatus } from '~/errors'
import { MEDIAS_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'

class MediaService {
  async uploadSingleImage(req: Request) {
    const file = await handleUploadSingleImage(req)
    const filename = `${file.newFilename}.webp`
    const filepath = path.resolve(UPLOAD_IMAGE_DIR, filename)

    await sharp(file.filepath).rotate().resize(256, 256, { fit: 'cover' }).webp({ quality: 80 }).toFile(filepath)
    fs.unlinkSync(file.filepath)

    return { url: `${BASE_URL}/static/images/${filename}`, type: MediaType.Image }
  }

  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const filename = `${file.newFilename}.webp`
        const filepath = path.resolve(UPLOAD_IMAGE_DIR, filename)

        await sharp(file.filepath).rotate().webp({ quality: 80 }).toFile(filepath)
        fs.unlinkSync(file.filepath)

        return { url: `${BASE_URL}/static/images/${filename}`, type: MediaType.Image }
      })
    )
    return result
  }

  async uploadVideo(req: Request) {
    const file = await handleUploadVideo(req)
    const filename = `${file.newFilename}.mp4`
    const filepath = path.resolve(UPLOAD_VIDEO_DIR, filename)

    fs.renameSync(file.filepath, filepath)

    return {
      url: `${BASE_URL}/static/videos/${filename}`,
      type: MediaType.Video
    }
  }

  getVideoStreamInfo({ filename, range }: { filename: string; range: string }) {
    const videoPath = path.resolve(UPLOAD_VIDEO_DIR, filename)

    if (!fs.existsSync(videoPath)) {
      throw new ErrorWithStatus({
        message: MEDIAS_MESSAGES.VIDEO_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }

    const videoSize = fs.statSync(videoPath).size
    const chunkSize = 10 ** 6
    const start = Number(range.replace(/\D/g, ''))
    const end = Math.min(start + chunkSize, videoSize - 1)

    const contentLength = end - start + 1
    const contentType = filename.endsWith('.mp4')
      ? 'video/mp4'
      : filename.endsWith('.mov')
        ? 'video/quicktime'
        : 'video/*'

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': contentType
    }

    const videoStream = fs.createReadStream(videoPath, { start, end })

    return { headers, videoStream }
  }
}

const mediaService = new MediaService()
export default mediaService
