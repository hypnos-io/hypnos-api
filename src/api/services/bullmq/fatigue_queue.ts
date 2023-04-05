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
export const fatigueQueue = new Queue(QUEUE_NAME, connection)
export let fatigueWorker: Worker<SocketDataResponse>

async function setupFatigueWorker() {
  fatigueWorker = new Worker<SocketDataResponse>(
    QUEUE_NAME,
    async (job) => {
      await onFatigueJob(job.data)
      return 'DONE'
    },
    connection
  )
  fatigueWorker.on('completed', () =>
    console.log('[BullMQ] Ocorrência de fadiga cadastrada com sucesso!')
  )
}

async function onFatigueJob(response: SocketDataResponse) {
  const createFatigueUC = new Create(
    new MongoDBFatigueService(new MongoDBConnection())
  )
  return createFatigueUC.execute(response.imageStatus, response.employeeId)
}

export async function createFatigueBullMQ(response: SocketDataResponse) {
  await fatigueQueue.add(QUEUE_NAME, response)
}

setupFatigueWorker()
