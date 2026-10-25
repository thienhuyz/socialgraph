import { Request } from 'express'
import { File, formidable } from 'formidable'
import fs from 'fs'
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from '~/constants/dir'
import { MEDIAS_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/errors'

export const initFloder = () => {
  ;[UPLOAD_TEMP_DIR, UPLOAD_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
}

// Upload 1 ảnh duy nhất (Avatar / Cover Photo)
export const handleUploadSingleImage = async (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_TEMP_DIR,
    maxFiles: 1,
    maxFileSize: 5 * 1024 * 1024,
    keepExtensions: true,
    filter: function ({ name, mimetype }) {
      return name === 'image' && Boolean(mimetype?.includes('image/'))
    }
  })

  const [, files] = await form.parse(req)

  if (!files.image) {
    throw new ErrorWithStatus({
      message: MEDIAS_MESSAGES.FILE_IS_REQUIRED,
      status: HTTP_STATUS.BAD_REQUEST
    })
  }

  return (files.image as File[])[0]
}

export const handleUploadImage = async (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_TEMP_DIR,
    maxFiles: 10,
    maxFileSize: 5 * 1024 * 1024,
    maxTotalFileSize: 30 * 1024 * 1024,
    keepExtensions: true,
    filter: function ({ name, mimetype }) {
      return name === 'image' && Boolean(mimetype?.includes('image/'))
    }
  })

  const [, files] = await form.parse(req)

  if (!files.image) {
    throw new ErrorWithStatus({
      message: MEDIAS_MESSAGES.FILE_IS_REQUIRED,
      status: HTTP_STATUS.BAD_REQUEST
    })
  }

  return files.image as File[]
}

export const getNameFileUpload = (name: string) => {
  const arrName = name.split('.')
  arrName.pop()
  return arrName.join('')
}
