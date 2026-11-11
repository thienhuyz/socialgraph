import { Router } from 'express'
import {
  serveImageController,
  serveM3u8Controller,
  serveSegmentController,
  serveVideoStreamController
} from '~/controllers/static.controllers'

const staticRoutes = Router()

staticRoutes.get('/images/:filename', serveImageController)
staticRoutes.get('/video-stream/:filename', serveVideoStreamController)

// Routes phục vụ HLS Streaming
staticRoutes.get('/video-hls/:id/master.m3u8', serveM3u8Controller)
staticRoutes.get('/video-hls/:id/:v/:segment', serveSegmentController)

export default staticRoutes
