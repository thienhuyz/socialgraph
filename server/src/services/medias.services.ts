import { Request } from 'express'
import { BASE_URL } from '~/utils/config'
import { handleUploadImage, handleUploadSingleImage, getNameFileUpload } from '~/utils/file'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import path from 'path'
import fs from 'fs'
import { Media } from '~/models/types/Media.types'
import { MediaType } from '~/constants/enums'

class MediaService {
  async uploadSingleImage(req: Request) {
    const file = await handleUploadSingleImage(req)
    const newName = getNameFileUpload(file.newFilename)
    const filepath = path.resolve(UPLOAD_DIR, `${newName}.webp`)

    await sharp(file.filepath).rotate().resize(256, 256, { fit: 'cover' }).webp({ quality: 80 }).toFile(filepath)
    fs.unlinkSync(file.filepath)

    return { url: `${BASE_URL}/static/images/${newName}.webp`, type: MediaType.Image }
  }

  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFileUpload(file.newFilename)
        const filepath = path.resolve(UPLOAD_DIR, `${newName}.webp`)

        await sharp(file.filepath).rotate().webp({ quality: 80 }).toFile(filepath)
        fs.unlinkSync(file.filepath)

        return { url: `${BASE_URL}/static/images/${newName}.webp`, type: MediaType.Image }
      })
    )
    return result
  }
}

const mediaService = new MediaService()
export default mediaService
