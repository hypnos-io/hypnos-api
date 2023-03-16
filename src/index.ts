import * as dotenv from 'dotenv'
import express from 'express'
import {SupervisorRoutes} from './api/routes/supervisor'
import {VERSIONAPI} from './constants'
dotenv.config()

const app = express()
app.use(express.json())
const PORT = 3000

app.get('/', (req, resp) => {
  return resp.json({
    hello: 'hypnos',
    version: VERSIONAPI,
  })
})

app.use(SupervisorRoutes)
app.listen(PORT)
