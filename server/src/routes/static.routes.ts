import { Router } from 'express'
import { serveImageController } from '~/controllers/static.controllers'

const staticRoutes = Router()

staticRoutes.get('/images/:filename', serveImageController)
export default staticRoutes
