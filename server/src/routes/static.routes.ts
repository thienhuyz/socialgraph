import { Router } from 'express'
import { serveImageController, serveVideoController } from '~/controllers/static.controllers'

const staticRoutes = Router()

staticRoutes.get('/images/:filename', serveImageController)
staticRoutes.get('/videos/:filename', serveVideoController)

export default staticRoutes
