import { Router } from 'express'
import { serveImageController, serveVideoStreamController } from '~/controllers/static.controllers'

const staticRoutes = Router()

staticRoutes.get('/images/:filename', serveImageController)
staticRoutes.get('/video-stream/:filename', serveVideoStreamController)

export default staticRoutes
