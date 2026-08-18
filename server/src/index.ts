import express, { Request, Response, NextFunction } from 'express'
import databaseService from '~/services/database.services'
import usersRouter from '~/routes/users.routes'
const app = express()
const PORT = 3000

app.use(express.json())
app.use('/users', usersRouter)
databaseService.connect()
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err)
  res.status(400).json({ error: err.message })
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
