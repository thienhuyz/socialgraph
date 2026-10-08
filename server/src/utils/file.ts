import { Request } from 'express'
import { formidable } from 'formidable'
import fs from 'fs'
import { UPLOAD_TEMP_DIR } from '~/constants/dir'
import { USERS_MESSAGES } from '~/constants/messages'

export const initFloder = () => {
  if (!fs.existsSync(UPLOAD_TEMP_DIR)) {
    fs.mkdirSync(UPLOAD_TEMP_DIR, { recursive: true })
  }
}

export const handleFileUpload = async (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_TEMP_DIR,
    maxFiles: 1,
    maxFileSize: 2 * 1024 * 1024,
    keepExtensions: true,
    filter: function ({ name, mimetype }) {
      return name === 'image' && Boolean(mimetype?.includes('image/'))
    }
  })

  const [, files] = await form.parse(req)

  if (!files.image) {
    throw new Error(USERS_MESSAGES.FILE_IS_REQUIRED)
  }

  return files.image[0]
}

export const getNameFileUpload = (name: string) => {
  const arrName = name.split('.')
  arrName.pop()
  return arrName.join('')
}
