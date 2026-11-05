import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import mime from 'mime'
import HTTP_STATUS from '~/constants/httpStatus'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { MEDIAS_MESSAGES } from '~/constants/messages'

export const serveImageController = (req: Request, res: Response) => {
  const { filename } = req.params as { filename: string }

  res.sendFile(filename, { root: UPLOAD_IMAGE_DIR }, (err) => {
    if (err && !res.headersSent) {
      res.status(404).json({ message: MEDIAS_MESSAGES.IMAGE_NOT_FOUND })
    }
  })
}

export const serveVideoStreamController = (req: Request, res: Response) => {
  const range = req.headers.range
  if (!range) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send('Requires Range header')
  }

  const { filename } = req.params as { filename: string }
  const videoPath = path.resolve(UPLOAD_VIDEO_DIR, filename)

  if (!fs.existsSync(videoPath)) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: MEDIAS_MESSAGES.VIDEO_NOT_FOUND })
  }

  const videoSize = fs.statSync(videoPath).size
  const chunkSize = 10 ** 6
  const start = Number(range.replace(/\D/g, ''))
  const end = Math.min(start + chunkSize, videoSize - 1)

  const contentLength = end - start + 1
  const contentType = mime.getType(videoPath) || 'video/*'

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': contentType
  }

  res.writeHead(HTTP_STATUS.PARTIAL_CONTENT, headers)

  const videoStream = fs.createReadStream(videoPath, { start, end })
  videoStream.pipe(res)
}
