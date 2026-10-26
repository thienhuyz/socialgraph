import { Router } from 'express'
import {
  uploadImageController,
  uploadSingleImageController,
  uploadVideoController
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

export default mediaRouter
