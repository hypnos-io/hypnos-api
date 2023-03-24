import {Server} from 'socket.io'
import {FatigueStatus} from '../../domain/entities/fatigue'

type Image = string

interface SocketData {
  id: string
  employeeId: string
}

interface SocketDataRequest extends SocketData {
  images: Image[]
}

interface SocketDataResponse extends SocketData {
  imageStatus: FatigueStatus
}

// This function is getting the images from the front end application and sending them to drowsy api
export function processImage(io: Server, data: SocketDataRequest) {
  io.emit('process-image', data)
}

// This function is used to get the status of the worker face from drowsy api
export function notifyStatus(io: Server, response: SocketDataResponse) {
  io.to(response.id).emit('notify-status', response.imageStatus)
}
