import { Router } from 'express'
import {
  serveImageController,
  serveVideoController,
  serveVideoStreamController
} from '~/controllers/static.controllers'

const staticRoutes = Router()

staticRoutes.get('/images/:filename', serveImageController)
staticRoutes.get('/videos/:filename', serveVideoController)
staticRoutes.get('/video-stream/:filename', serveVideoStreamController)

export default staticRoutes
