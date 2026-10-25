import { Router } from 'express'
import { uploadImageController, uploadSingleImageController } from '~/controllers/medias.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const mediaRouter = Router()

mediaRouter.post('/upload-single-image', wrapRequestHandler(uploadSingleImageController))
mediaRouter.post('/upload-image', wrapRequestHandler(uploadImageController))

export default mediaRouter
