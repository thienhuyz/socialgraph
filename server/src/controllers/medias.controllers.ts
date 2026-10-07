import { NextFunction, Request, Response } from 'express'
import mediaService from '~/services/medias.services'

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await mediaService.hanleUploadSingleImage(req, res, next)
  res.json(result)
}
