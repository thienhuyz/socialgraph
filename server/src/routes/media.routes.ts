import { Router } from 'express'
import {
  uploadImageController,
  uploadSingleImageController,
  uploadVideoController,
  uploadVideoHLSController
} from '~/controllers/medias.controllers'
import { accessTokenValidator, verifyValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const mediaRouter = Router()

mediaRouter.post(
  '/upload-single-image',
  accessTokenValidator,
  verifyValidator,
  wrapRequestHandler(uploadSingleImageController)
)
mediaRouter.post('/upload-image', accessTokenValidator, verifyValidator, wrapRequestHandler(uploadImageController))
mediaRouter.post('/upload-video', accessTokenValidator, verifyValidator, wrapRequestHandler(uploadVideoController))
mediaRouter.post(
  '/upload-video-hls',
  accessTokenValidator,
  verifyValidator,
  wrapRequestHandler(uploadVideoHLSController)
)

export default mediaRouter
