import { Request, Response } from 'express'
import { MEDIAS_MESSAGES } from '~/constants/messages'
import mediaService from '~/services/medias.services'

export const uploadImageController = async (req: Request, res: Response) => {
  const result = await mediaService.uploadImage(req)
  res.json({
    message: MEDIAS_MESSAGES.UPLOAD_IMAGE_SUCCESSFULLY,
    result
  })
}
