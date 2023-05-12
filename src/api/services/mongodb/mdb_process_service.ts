import mongoose, {Schema} from 'mongoose'
import {DB_URL} from '../../../constants'
import {Process} from '../../../domain/entities/process'
import {
  IProcessService,
  OptionalProcess,
} from '../../../domain/ports/iprocess_service'
import {Connection} from '../connection'

const ProcessSchema = new Schema<Process>(
  {
    name: String,
  },
  {timestamps: true}
)

const ProcessModel = mongoose.model('Processes', ProcessSchema)

export class MongoDBProcessService implements IProcessService {
  constructor(private readonly connection: Connection) {}

  async connect(): Promise<void> {
    if (!DB_URL) throw new Error('DB URL not found.')
    const isConnected = await this.connection.connect(DB_URL)
    if (!isConnected) throw new Error('DB not connected')
  }

  async create(newProcess: Process): Promise<OptionalProcess> {
    await this.connect()
    return ProcessModel.create(newProcess)
  }

  async fetchAll(filters: Partial<Omit<Process, '_id'>>): Promise<Process[]> {
    await this.connect()
    return ProcessModel.find(filters)
  }

  async update(
    id: string,
    newProcess: Partial<Process>
  ): Promise<OptionalProcess> {
    await this.connect()
    return ProcessModel.findOneAndUpdate({_id: id}, newProcess)
  }

  async deleteById(id: string): Promise<OptionalProcess> {
    await this.connect()
    return ProcessModel.findOneAndDelete({_id: id})
  }

  async findById(id: string): Promise<OptionalProcess> {
    await this.connect()
    return ProcessModel.findOne({_id: id})
  }
}
