import { Request } from 'express'
import { BASE_URL } from '~/utils/config'
import { handleUploadImage, handleUploadSingleImage, handleUploadVideo } from '~/utils/file'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import path from 'path'
import fs from 'fs'
import { Media } from '~/models/types/Media.types'
import { MediaType } from '~/constants/enums'

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
}

const mediaService = new MediaService()
export default mediaService
