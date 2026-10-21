import { Request } from 'express'
import { BASE_URL } from '~/utils/config'
import { handleFileUpload, getNameFileUpload } from '~/utils/file'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import path from 'path'
import fs from 'fs'
import { Media } from '~/models/types/Media.types'
import { MediaType } from '~/constants/enums'

class MediaService {
  async uploadImage(req: Request) {
    const files = await handleFileUpload(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFileUpload(file.newFilename)
        const filepath = path.resolve(UPLOAD_DIR, `${newName}.webp`)
        await sharp(file.filepath).rotate().resize(256, 256, { fit: 'cover' }).webp({ quality: 80 }).toFile(filepath)
        fs.unlinkSync(file.filepath)
        return { url: `${BASE_URL}/medias/${newName}.webp`, type: MediaType.Image }
      })
    )
    return result
  }
}

const mediaService = new MediaService()
export default mediaService
