import {Server} from 'socket.io'
import {MongoDBConnection} from '../../api/services/mongodb/mdb_connection'
import {MongoDBFatigueService} from '../../api/services/mongodb/mdb_fatigue_service'
import {FatigueStatus} from '../../domain/entities/fatigue'
import {Create} from '../../domain/use_cases/fatigue/Create'

type Image = string

interface SocketData {
  id: string
  employeeId: string
  workstation: string
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
  const createFatigueUC = new Create(
    new MongoDBFatigueService(new MongoDBConnection())
  )
  createFatigueUC.execute(response.imageStatus, response.employeeId)
  io.to(response.id).emit('notify-status', response)
  io.to(response.workstation).emit('notify-status', response)
}
