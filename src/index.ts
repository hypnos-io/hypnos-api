import * as dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import {serve, setup} from 'swagger-ui-express'
import {EmployeeRouter} from './api/routes/employee'
import {SupervisorRoutes} from './api/routes/supervisor'
import {VERSIONAPI} from './constants'
import {createWebsocketServer, useWebsocketEvents} from './websocket'

import {JobRouter} from './api/routes/job'
import {LeaderRoutes} from './api/routes/leader'
import {ProcessRouter} from './api/routes/process'
import {SectorRoutes} from './api/routes/sectors'
import {UserRoutes} from './api/routes/user'
import {WorkstationRoutes} from './api/routes/workstation'
import swaggerJson from './swagger.json'

export const app = express()
app.use(express.json())
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.use(cookieParser())
const PORT = 3000

app.get('/', (req, resp) => {
  return resp.json({
    hello: 'hypnos',
    version: VERSIONAPI,
  })
})

app.use('/swagger', serve, setup(swaggerJson))
app.use(UserRoutes)
app.use(LeaderRoutes)
app.use(SupervisorRoutes)
app.use(EmployeeRouter)
app.use(WorkstationRoutes)
app.use(SectorRoutes)
app.use(ProcessRouter)
app.use(JobRouter)

const {io, server} = createWebsocketServer(app)
useWebsocketEvents(io)
server.listen(PORT)
