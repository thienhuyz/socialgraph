import { NextFunction, Request, Response } from 'express'
import { handleFileUpload } from '~/utils/file'
import sharp from 'sharp'

class MediaService {
  async hanleUploadSingleImage(req: Request, res: Response, next: NextFunction) {
    const file = await handleFileUpload(req, res, next)
    return file
  }
}

const mediaService = new MediaService()
export default mediaService
