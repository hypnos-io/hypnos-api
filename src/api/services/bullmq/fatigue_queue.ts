import {Queue, Worker} from 'bullmq'
import {Create} from '../../../domain/use_cases/fatigue/Create'
import {SocketDataResponse} from '../../../websocket/events/fatigue'
import {MongoDBConnection} from '../mongodb/mdb_connection'
import {MongoDBFatigueService} from '../mongodb/mdb_fatigue_service'

const QUEUE_NAME = 'Fatigue'

export const fatigueQueue = new Queue(QUEUE_NAME)
export const createFatigueWorker = new Worker<SocketDataResponse>(
  QUEUE_NAME,
  (job) => createFatigueBullMQ(job.data)
)

export async function createFatigueBullMQ(response: SocketDataResponse) {
  const createFatigueUC = new Create(
    new MongoDBFatigueService(new MongoDBConnection())
  )
  return createFatigueUC.execute(response.imageStatus, response.employeeId)
}
