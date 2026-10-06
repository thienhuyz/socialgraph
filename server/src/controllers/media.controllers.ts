import { NextFunction, Request, Response } from 'express'
import { formidable } from 'formidable'
import path from 'path'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    maxFileSize: 300 * 1024,
    keepExtensions: true,
    filter: function ({ name, mimetype }) {
      return name === 'image' && Boolean(mimetype?.includes('image/'))
    }
  })

  try {
    const [, files] = await form.parse(req)
    console.log('files', files)
    if (!files.image) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: USERS_MESSAGES.FILE_IS_REQUIRED })
    }

    return res.json({
      message: USERS_MESSAGES.UPLOAD_IMAGE_SUCCESSFULLY
    })
  } catch (error) {
    return next(error)
  }
}
