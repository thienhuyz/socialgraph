import fs from 'fs'
import path from 'path'

export const initFloder = () => {
  const uploadsDir = path.resolve('uploads')
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }
}
