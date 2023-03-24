import {Server} from 'socket.io'

interface SocketDataRequest {
  id: string
  images: string[]
}

interface ImageStatus {
  kssScale: number
  detection: {
    mouth: Record<string, string | number>
    eyes: Record<string, string | number>
    head: Record<string, string | number>
  }
}

interface SocketDataResponse {
  id: string
  imageStatus: ImageStatus
}

// This function is getting the images from the front end application and sending them to drowsy api
export function processImage(io: Server, data: SocketDataRequest) {
  io.emit('process-image', data)
}

// This function is used to get the status of the worker face from drowsy api
export function notifyStatus(io: Server, response: SocketDataResponse) {
  io.to(response.id).emit('notify-status', response.imageStatus)
}
