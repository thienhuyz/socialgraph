import { NextFunction, Request, Response } from 'express'
import { formidable } from 'formidable'
import fs from 'fs'
import path from 'path'
import { UPLOAD_TEMP_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'

export const initFloder = () => {
  const uploadsDir = UPLOAD_TEMP_DIR
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }
}

export const handleFileUpload = async (req: Request, res: Response, next: NextFunction) => {
  const form = formidable({
    uploadDir: UPLOAD_TEMP_DIR,
    maxFiles: 1,
    maxFileSize: 300 * 1024,
    keepExtensions: true,
    filter: function ({ name, mimetype }) {
      return name === 'image' && Boolean(mimetype?.includes('image/'))
    }
  })

  try {
    const [, files] = await form.parse(req)
    if (!files.image) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: USERS_MESSAGES.FILE_IS_REQUIRED })
    }
    return res.json({
      image: files.image[0],
      message: USERS_MESSAGES.UPLOAD_IMAGE_SUCCESSFULLY
    })
  } catch (error) {
    return next(error)
  }
}
