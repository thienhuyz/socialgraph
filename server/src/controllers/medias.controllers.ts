import { Request, Response } from 'express'
import mediaService from '~/services/medias.services'

export const uploadSingleImageController = async (req: Request, res: Response) => {
  const result = await mediaService.uploadSingleImage(req)
  res.json(result)
}
