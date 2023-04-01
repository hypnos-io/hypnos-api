import {Queue, QueueOptions, Worker} from 'bullmq'
import {REDIS_HOST, REDIS_PASSWORD, REDIS_PORT} from '../../../constants'
import {Create} from '../../../domain/use_cases/fatigue/Create'
import {SocketDataResponse} from '../../../websocket/events/fatigue'
import {MongoDBConnection} from '../mongodb/mdb_connection'
import {MongoDBFatigueService} from '../mongodb/mdb_fatigue_service'

const QUEUE_NAME = 'Fatigue'

const connection: QueueOptions = {
  connection: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  },
}

async function onFatigueJob(response: SocketDataResponse) {
  const createFatigueUC = new Create(
    new MongoDBFatigueService(new MongoDBConnection())
  )
  return createFatigueUC.execute(response.imageStatus, response.employeeId)
}

export function getFatigueQueue() {
  const queue = new Queue(QUEUE_NAME, connection)
  const worker = new Worker<SocketDataResponse>(
    QUEUE_NAME,
    (job) => onFatigueJob(job.data),
    connection
  )
  return {queue, worker}
}

export async function createFatigueBullMQ(
  queue: Queue,
  response: SocketDataResponse
) {
  return queue.add(QUEUE_NAME, response)
}
