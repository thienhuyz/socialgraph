import { Request, Response } from 'express'
import path from 'path'
import { UPLOAD_DIR } from '~/constants/dir'
import { MEDIAS_MESSAGES } from '~/constants/messages'

export const serveImageController = (req: Request, res: Response) => {
  const { filename } = req.params as { filename: string }

  res.sendFile(filename, { root: UPLOAD_DIR }, (err) => {
    if (err && !res.headersSent) {
      res.status(404).json({ message: MEDIAS_MESSAGES.IMAGE_NOT_FOUND })
    }
  })
}
