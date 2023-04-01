import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import {Server, Socket} from 'socket.io'
import {io as clientio, Socket as ClientSocket} from 'socket.io-client'
import {createWebsocketServer, useWebsocketEvents} from '../../src/websocket'
import {SocketDataRequest} from '../../src/websocket/events/fatigue'
describe('WebsocketServer (e2e)', () => {
  const PORT = 3000
  let io: Server
  let clientSocketFrontend: ClientSocket
  let clientSocketDrowsy: ClientSocket
  let serverSocket: Socket

  beforeAll((done) => {
    const app = express()
    const {io: sockio, server} = createWebsocketServer(app)
    io = sockio
    useWebsocketEvents(io)
    server.listen(PORT, () => {
      clientSocketFrontend = clientio(`http://localhost:${PORT}`)
      clientSocketDrowsy = clientio(`http://localhost:${PORT}`)
      io.on('connection', (socket) => {
        serverSocket = socket
      })
      // clientSocketFrontend.on('connect', done)
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
    serverSocket.emit('test', 'hello')
  })

  it('Should be pass image to drowsy api', (done) => {
    const data: SocketDataRequest = {
      id: '01',
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

  afterAll(() => {
    io.close()
    clientSocketFrontend.close()
    clientSocketDrowsy.close()
  })
})
