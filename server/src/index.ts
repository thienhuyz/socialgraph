import express, { Request, Response, NextFunction } from 'express'
import databaseService from '~/services/database.services'
import usersRouter from '~/routes/users.routes'
import { defaultErrorHandler } from './middlewares/error.middlewares'
const app = express()
const PORT = 3000

app.use(express.json())
app.use('/users', usersRouter)
databaseService.connect()
app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
