import {Server} from 'socket.io'
import {createFatigueBullMQ} from '../../api/services/bullmq/fatigue_queue'
import {FatigueStatus} from '../../domain/entities/fatigue'

type Image = string

interface SocketData {
  id: string
  employeeId: string
  workstation: string
}

export interface SocketDataRequest extends SocketData {
  images: Image[]
}

export interface SocketDataResponse extends SocketData {
  imageStatus: FatigueStatus
}

// This function is getting the images from the front end application and sending them to drowsy api
export function processImage(io: Server, data: SocketDataRequest) {
  io.emit('process-image', data)
}

// This function is used to get the status of the worker face from drowsy api
export async function notifyStatus(io: Server, response: SocketDataResponse) {
  await createFatigueBullMQ(response)
  io.emit(`notify-status:user-${response.id}`, response)
  io.emit(`notify-status:workstation-${response.workstation}`, response)
}
