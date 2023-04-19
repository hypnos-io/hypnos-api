import * as dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import {serve, setup} from 'swagger-ui-express'
import {EmployeeRouter} from './api/routes/employee'
import {SupervisorRoutes} from './api/routes/supervisor'
import {VERSIONAPI} from './constants'
import {createWebsocketServer, useWebsocketEvents} from './websocket'

import {authRequired} from './api/middlewares/auth'
import {LeaderRoutes} from './api/routes/leader'
import {UserRoutes} from './api/routes/user'
import swaggerJson from './swagger.json'

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

app.use('/swagger', serve, setup(swaggerJson))
app.use(UserRoutes)
app.use(authRequired, LeaderRoutes)
app.use(authRequired, SupervisorRoutes)
app.use(authRequired, EmployeeRouter)

const {io, server} = createWebsocketServer(app)
useWebsocketEvents(io)
server.listen(PORT)
