import { Request } from 'express'
import { handleFileUpload, getNameFileUpload } from '~/utils/file'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import path from 'path'
import fs from 'fs'

class MediaService {
  async uploadSingleImage(req: Request) {
    const file = await handleFileUpload(req)
    const newName = getNameFileUpload(file.newFilename)
    const filepath = path.resolve(UPLOAD_DIR, `${newName}.webp`)
    await sharp(file.filepath).rotate().resize(256, 256, { fit: 'cover' }).webp({ quality: 80 }).toFile(filepath)
    fs.unlinkSync(file.filepath)
    return `http://localhost:${process.env.PORT}/uploads/${newName}.webp`
  }
}

const mediaService = new MediaService()
export default mediaService
