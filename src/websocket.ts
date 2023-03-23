import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'

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

interface SocketDataRequest {
  id: string
  images: string[]
}

interface ImageStatus {
  kssScale: number // KSS scale
  detection: {
    // Detection values
    mouth: Record<string, string | number>
    eyes: Record<string, string | number>
    head: Record<string, string | number>
  }
}

interface SocketDataResponse {
  id: string
  imageStatus: ImageStatus
}

export function useSocket(io: Server) {
  // This event refers to the connections between hypnos and the two clients
  io.on('connection', (socket) => {
    console.log(`${socket.id} is connected.`)

    // This function is getting the images from the front end application and sending them to drowsy api
    socket.on('process-image', (data: SocketDataRequest) => {
      io.emit('process-image', data)
    })

    // This function is used to get the status of the worker face from drowsy api
    socket.on('notify-status', (response: SocketDataResponse) => {
      io.to(response.id).emit('notify-status', response.imageStatus)
    })
  })
}
