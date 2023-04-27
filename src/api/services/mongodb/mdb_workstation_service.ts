import mongoose, {Schema} from 'mongoose'
import {DB_URL} from '../../../constants'
import {Workstation} from '../../../domain/entities/workstation'
import {
  IWorkstationService,
  OptionalWorkstation,
  WorkstationFilter,
} from '../../../domain/ports/iworkstation_service'
import {Connection} from '../connection'

const WorkstationSchema = new Schema<Workstation>(
  {
    cameraId: String,
    value: String,
    employee: {type: Schema.Types.ObjectId, ref: 'Employees'},
  },
  {timestamps: true}
)

const WorkstationModel = mongoose.model<Workstation>(
  'Workstations',
  WorkstationSchema
)

export class MongoDBWorkstationSerice implements IWorkstationService {
  constructor(private readonly connection: Connection) {}

  async update(
    id: string,
    newWorkstation: Partial<Workstation>
  ): Promise<OptionalWorkstation> {
    await this.connect()
    const updatedWorkstation = await WorkstationModel.findByIdAndUpdate(
      id,
      newWorkstation
    ).populate('employee')
    return updatedWorkstation
  }

  async connect(): Promise<void> {
    if (!DB_URL) throw new Error('DB URL not found.')
    const isConnected = await this.connection.connect(DB_URL)
    if (!isConnected) throw new Error('DB not connected')
  }

  async create(newWorkstation: Workstation): Promise<Workstation> {
    await this.connect()
    const createdWorkstation = await WorkstationModel.create({
      ...newWorkstation,
    })
    return createdWorkstation
  }

  async findById(id: string): Promise<Workstation | null | undefined> {
    await this.connect()
    return WorkstationModel.findOne({_id: id}).populate('employee')
  }

  async fetchAll(filters: WorkstationFilter): Promise<Workstation[]> {
    await this.connect()
    return WorkstationModel.find(filters).populate('employee')
  }

  async deleteById(id: string): Promise<void> {
    await this.connect()
    await WorkstationModel.deleteOne({_id: id})
  }
}
