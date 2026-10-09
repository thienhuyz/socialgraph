import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

export const PORT = Number(process.env.PORT) || 5000
export const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`
