import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import {notifyStatus, processImage} from './websocket/events/fatigue'

export function createWebsocketServer(app: express.Express) {
  const server = createServer(app)
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    maxHttpBufferSize: 1e8,
  })
  return {
    io,
    server,
  }
}

export function useWebsocketEvents(io: Server) {
  // This event refers to the connections between hypnos and the two clients
  io.on('connection', (socket) => {
    console.log(`${socket.id} is connected.`)
    socket.on('process-image', (data) => processImage(io, data))
    socket.on('notify-status', (data) => notifyStatus(io, data))
  })
}
