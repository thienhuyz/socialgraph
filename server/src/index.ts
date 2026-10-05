import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import databaseService from '~/services/database.services'
import usersRouter from '~/routes/users.routes'
import { defaultErrorHandler } from '~/middlewares/error.middlewares'
import mediaRouter from './routes/media.routes'
import { initFloder } from './utils/file'

const app = express()
const PORT = Number(process.env.PORT) || 3000
initFloder()
app.use(cors())
app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediaRouter)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})
app.use(defaultErrorHandler)

const bootstrap = async () => {
  await databaseService.connect()

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
}

bootstrap()
