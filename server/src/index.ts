import express, { Request, Response } from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'SocialGraph API đang chạy' })
})

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`)
})
