import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import {Server as HTTPServer} from 'http'
import {Server} from 'socket.io'
import {io as clientio, Socket as ClientSocket} from 'socket.io-client'
import {createWebsocketServer, useWebsocketEvents} from '../../src/websocket'
import {
  SocketDataRequest,
  SocketDataResponse,
} from '../../src/websocket/events/fatigue'

describe('WebsocketServer (e2e)', () => {
  const PORT = 3000
  let io: Server
  let websocketServer: HTTPServer
  let clientSocketFrontend: ClientSocket
  let clientSocketDrowsy: ClientSocket

  beforeAll((done) => {
    const app = express()
    const {io: sockio, server} = createWebsocketServer(app)
    io = sockio
    websocketServer = server
    useWebsocketEvents(io)
    server.listen(PORT, () => {
      clientSocketFrontend = clientio(`http://localhost:${PORT}`)
      clientSocketDrowsy = clientio(`http://localhost:${PORT}`)
      clientSocketFrontend.on('connect', () => {
        clientSocketDrowsy.on('connect', done)
      })
    })
  })

  it('Should be receive the message successfully', (done) => {
    clientSocketFrontend.on('test', (message) => {
      expect(message).toBe('hello')
      done()
    })
    io.emit('test', 'hello')
  })

  it('Should pass images to drowsy api', (done) => {
    const id = '01'
    const data: SocketDataRequest = {
      id,
      employeeId: '01',
      workstation: 'F1',
      images: ['imagedata'],
    }
    clientSocketDrowsy.on('process-image', (request: SocketDataRequest) => {
      expect(request).toEqual(data)
      done()
    })
    clientSocketFrontend.emit('process-image', data)
  })

  it('Should notify frontend with drowsy api response', (done) => {
    const id = '01'
    const data: SocketDataResponse = {
      id,
      employeeId: '001',
      workstation: '001',
      imageStatus: {
        detection: {
          eyes: {},
          mouth: {},
          head: {},
        },
        kssScale: 6,
      },
    }
    clientSocketFrontend.on('notify-status', (response: SocketDataResponse) => {
      expect(response).toEqual(data)
      done()
    })
    clientSocketDrowsy.emit('notify-status', data)
  })

  afterAll(() => {
    io.close()
    websocketServer.close()
    clientSocketFrontend.close()
    clientSocketDrowsy.close()
  })
})
