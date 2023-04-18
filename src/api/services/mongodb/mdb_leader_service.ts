import mongoose, {Schema} from 'mongoose'
import {DB_URL} from '../../../constants'
import {ID} from '../../../domain/entities/common'
import {Leader} from '../../../domain/entities/leader'
import {
  ILeaderService,
  LeaderFilter,
  OptionalLeader,
} from '../../../domain/ports/ileader_service'
import {Connection} from '../connection'

const LeaderSchema = new Schema<Leader>(
  {
    registration: String,
    admissionDate: Date,
    firstName: String,
    lastName: String,
    password: String,
  },
  {timestamps: true}
)

const LeaderModel = mongoose.model<Leader>('Leaders', LeaderSchema)

export class MongoDBLeaderService implements ILeaderService {
  constructor(private readonly connection: Connection) {}

  async connect(): Promise<void> {
    if (!DB_URL) throw new Error('DB URL not found.')
    const isConnected = await this.connection.connect(DB_URL)
    if (!isConnected) throw new Error('DB not connected')
  }

  async fetchAll(filter: LeaderFilter): Promise<Leader[]> {
    await this.connect()
    return LeaderModel.find(filter)
  }

  async findById(id: ID): Promise<OptionalLeader> {
    await this.connect()
    return LeaderModel.findOne({_id: id})
  }

  async update(id: ID, newLeader: Partial<Leader>): Promise<OptionalLeader> {
    await this.connect()
    return LeaderModel.findOneAndUpdate({_id: id}, newLeader)
  }

  async deleteById(id: ID): Promise<void> {
    await this.connect()
    await LeaderModel.deleteOne({_id: id})
  }

  async create(newLeader: Leader): Promise<OptionalLeader> {
    await this.connect()
    return LeaderModel.create(newLeader)
  }
}
