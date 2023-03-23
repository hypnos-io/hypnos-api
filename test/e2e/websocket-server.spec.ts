import express from 'express'
import {Server, Socket} from 'socket.io'
import {io as clientio, Socket as ClientSocket} from 'socket.io-client'
import {createWebsocketServer} from '../../src/websocket'
describe('WebsocketServer (e2e)', () => {
  const PORT = 3000
  let io: Server
  let clientSocket: ClientSocket
  let serverSocket: Socket

  beforeAll((done) => {
    const app = express()
    const {io: sockio, server} = createWebsocketServer(app)
    io = sockio
    server.listen(PORT, () => {
      clientSocket = clientio(`http://localhost:${PORT}`)
      io.on('connection', (socket) => {
        serverSocket = socket
      })
      clientSocket.on('connect', done)
    })
  })

  it('Should be receive the message successfully', (done) => {
    clientSocket.on('test', (message) => {
      expect(message).toBe('hello')
      done()
    })
    serverSocket.emit('test', 'hello')
  })

  afterAll(() => {
    io.close()
    clientSocket.close()
  })
})
