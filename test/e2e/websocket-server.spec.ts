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

  test('Should be receive the message successfully', (done) => {
    clientSocketFrontend.on('test', (message) => {
      expect(message).toBe('hello')
      done()
    })
    io.emit('test', 'hello')
  })

  test('Should pass images to drowsy api', (done) => {
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

  test('Should notify frontend with drowsy api response (private event)', (done) => {
    const id = '01'
    const data: SocketDataResponse = {
      id,
      employeeId: '6414fae6e7b86cadff2554af',
      workstation: '001',
      imageStatus: {
        detection: {
          eyes: {},
          mouth: {},
          head: {},
        },
        kssScale: 7,
      },
    }
    clientSocketFrontend.on(
      `notify-status:user-${id}`,
      (response: SocketDataResponse) => {
        expect(response).toEqual(data)
        done()
      }
    )
    clientSocketDrowsy.emit('notify-status', data)
  })

  test('Should notify frontend with drowsy api response (workstation event)', (done) => {
    const workstation = '001'
    const data: SocketDataResponse = {
      id: '01',
      employeeId: '6414fae6e7b86cadff2554af',
      workstation,
      imageStatus: {
        detection: {
          eyes: {},
          mouth: {},
          head: {},
        },
        kssScale: 7,
      },
    }
    clientSocketFrontend.on(
      `notify-status:workstation-${workstation}`,
      (response: SocketDataResponse) => {
        expect(response).toEqual(data)
        done()
      }
    )
    clientSocketDrowsy.emit('notify-status', data)
  })

  afterAll(() => {
    io.close()
    websocketServer.close()
    clientSocketFrontend.close()
    clientSocketDrowsy.close()
  })
})
