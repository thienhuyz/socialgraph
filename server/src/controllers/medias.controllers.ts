import { Request, Response } from 'express'
import { MEDIAS_MESSAGES } from '~/constants/messages'
import mediaService from '~/services/medias.services'

export const uploadSingleImageController = async (req: Request, res: Response) => {
  const result = await mediaService.uploadSingleImage(req)
  res.json({
    message: MEDIAS_MESSAGES.UPLOAD_IMAGE_SUCCESSFULLY,
    result
  })
}

export const uploadImageController = async (req: Request, res: Response) => {
  const result = await mediaService.uploadImage(req)
  res.json({
    message: MEDIAS_MESSAGES.UPLOAD_IMAGE_SUCCESSFULLY,
    result
  })
}

export const uploadVideoController = async (req: Request, res: Response) => {
  const result = await mediaService.uploadVideo(req)
  res.json({
    message: MEDIAS_MESSAGES.UPLOAD_VIDEO_SUCCESSFULLY,
    result
  })
}
