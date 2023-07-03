import express from 'express'
import './database/index.js'
import { rootRouter } from './routes/index.js'

const app = express()
app.use(express.json())

app.use('/api', rootRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
