import mongoose, {Schema} from 'mongoose'
import {DB_URL} from '../../../constants'
import {ID} from '../../../domain/entities/common'
import {Supervisor} from '../../../domain/entities/supervisor'
import {
  ISupervisorService,
  OptionalSupervisor,
  SupervisorFilter,
} from '../../../domain/ports/isupervisor_service'
import {Connection} from '../connection'

const SupervisorSchema = new Schema<Supervisor>(
  {
    registration: String,
    admissionDate: Date,
    firstName: String,
    lastName: String,
    password: String,
  },
  {timestamps: true}
)

const SupervisorModel = mongoose.model<Supervisor>(
  'Supervisors',
  SupervisorSchema
)

export class MongoDBSupervisorService implements ISupervisorService {
  constructor(private readonly connection: Connection) {}

  async connect(): Promise<void> {
    if (!DB_URL) throw new Error('DB URL not found.')
    const isConnected = await this.connection.connect(DB_URL)
    if (!isConnected) throw new Error('DB not connected')
  }

  async fetchAll(filter: SupervisorFilter): Promise<Supervisor[]> {
    await this.connect()
    return SupervisorModel.find(filter)
  }

  async findById(id: ID): Promise<OptionalSupervisor> {
    await this.connect()
    return SupervisorModel.findOne({_id: id})
  }

  async update(
    id: ID,
    newSupervisor: Partial<Supervisor>
  ): Promise<OptionalSupervisor> {
    await this.connect()
    return SupervisorModel.findOneAndUpdate({_id: id}, newSupervisor)
  }

  async deleteById(id: ID): Promise<void> {
    await this.connect()
    await SupervisorModel.deleteOne({_id: id})
  }

  async create(newSupervisor: Supervisor): Promise<OptionalSupervisor> {
    await this.connect()
    return SupervisorModel.create(newSupervisor)
  }
}
