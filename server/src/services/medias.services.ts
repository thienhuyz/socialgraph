import { Request } from 'express'
import { BASE_URL } from '~/utils/config'
import { handleFileUpload, getNameFileUpload } from '~/utils/file'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import path from 'path'
import fs from 'fs'

class MediaService {
  async uploadImage(req: Request) {
    const files = await handleFileUpload(req)
    Promise.all(
      files.map(async (file) => {
        const newName = getNameFileUpload(file.newFilename)
        const filepath = path.resolve(UPLOAD_DIR, `${newName}.webp`)
        await sharp(file.filepath).rotate().resize(256, 256, { fit: 'cover' }).webp({ quality: 80 }).toFile(filepath)
        fs.unlinkSync(file.filepath)
        return `${BASE_URL}/static/images/${newName}.webp`
      })
    )
  }
}

const mediaService = new MediaService()
export default mediaService
