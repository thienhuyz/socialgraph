import express from 'express'
import databaseService from '~/services/data.services'
const app = express()
const PORT = 3000

app.use(express.json())
databaseService.connect()

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
