import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { MEDIAS_MESSAGES } from '~/constants/messages'
import mediaService from '~/services/medias.services'

export const serveImageController = (req: Request, res: Response) => {
  const { filename } = req.params as { filename: string }

  res.sendFile(filename, { root: UPLOAD_IMAGE_DIR }, (err) => {
    if (err && !res.headersSent) {
      res.status(404).json({ message: MEDIAS_MESSAGES.IMAGE_NOT_FOUND })
    }
  })
}

export const serveVideoController = (req: Request, res: Response) => {
  const { filename } = req.params as { filename: string }

  res.sendFile(filename, { root: UPLOAD_VIDEO_DIR }, (err) => {
    if (err && !res.headersSent) {
      res.status(404).json({ message: MEDIAS_MESSAGES.VIDEO_NOT_FOUND })
    }
  })
}

export const serveVideoStreamController = (req: Request, res: Response) => {
  const range = req.headers.range
  if (!range) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send('Requires Range header')
  }

  const { filename } = req.params as { filename: string }
  const { headers, videoStream } = mediaService.getVideoStreamInfo({ filename, range })

  res.writeHead(HTTP_STATUS.PARTIAL_CONTENT, headers)
  videoStream.pipe(res)
}
