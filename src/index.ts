import * as dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import {EmmployeeRouter} from './api/routes/employee'
import {SupervisorRoutes} from './api/routes/supervisor'
import {VERSIONAPI} from './constants'
import {createWebsocketServer, useSocket} from './websocket'

export const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000

app.get('/', (req, resp) => {
  return resp.json({
    hello: 'hypnos',
    version: VERSIONAPI,
  })
})

app.use(SupervisorRoutes)
app.use(EmmployeeRouter)

const {io, server} = createWebsocketServer(app)
useSocket(io)
server.listen(PORT)
