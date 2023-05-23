import mongoose, {Schema} from 'mongoose'
import {DB_URL} from '../../../constants'
import {Workstation} from '../../../domain/entities/workstation'
import {
  IWorkstationService,
  OptionalWorkstation,
  WorkstationFilter,
} from '../../../domain/ports/iworkstation_service'
import {WorkstationUpdateRequest} from '../../../domain/use_cases/workstation/Update'
import {Connection} from '../connection'

const WorkstationSchema = new Schema<Workstation>(
  {
    cameraId: String,
    value: String,
    job: {type: Schema.Types.ObjectId, ref: 'Jobs'},
    employee: {type: Schema.Types.ObjectId, ref: 'Employees'},
    sector: {type: Schema.Types.ObjectId, ref: 'Sectors'},
  },
  {timestamps: true}
)

const WorkstationModel = mongoose.model<Workstation>(
  'Workstations',
  WorkstationSchema
)

export class MongoDBWorkstationService implements IWorkstationService {
  constructor(private readonly connection: Connection) {}

  async update(
    id: string,
    sectorId: string,
    newWorkstation: WorkstationUpdateRequest,
    employeeId?: string
  ): Promise<OptionalWorkstation> {
    await this.connect()
    const updatedWorkstation = await WorkstationModel.findOneAndUpdate(
      {_id: id, sector: sectorId},
      {employee: employeeId, job: newWorkstation.jobId, ...newWorkstation}
    ).populate(['employee', 'sector', 'job'])
    return updatedWorkstation
  }

  async connect(): Promise<void> {
    if (!DB_URL) throw new Error('DB URL not found.')
    const isConnected = await this.connection.connect(DB_URL)
    if (!isConnected) throw new Error('DB not connected')
  }

  async create(
    newWorkstation: Workstation,
    sectorId: string
  ): Promise<Workstation> {
    await this.connect()
    const createdWorkstation = await WorkstationModel.create({
      ...newWorkstation,
      sector: sectorId,
    })
    return createdWorkstation.populate(['employee', 'sector', 'job'])
  }

  async findById(
    id: string,
    sectorId: string
  ): Promise<Workstation | null | undefined> {
    await this.connect()
    return WorkstationModel.findOne({_id: id, sector: sectorId}).populate([
      'employee',
      'sector',
      'job',
    ])
  }

  async fetchAll(
    sectorId: string,
    filters: WorkstationFilter
  ): Promise<Workstation[]> {
    await this.connect()
    return WorkstationModel.find({...filters, sector: sectorId}).populate([
      'employee',
      'sector',
      'job',
    ])
  }

  async fetchAllByJob(sectorId: string, jobId: string): Promise<Workstation[]> {
    await this.connect()
    return WorkstationModel.find({sector: sectorId, job: jobId}).populate([
      'employee',
      'sector',
      'job',
    ])
  }
  async deleteById(id: string, sectorId: string): Promise<void> {
    await this.connect()
    await WorkstationModel.deleteOne({_id: id, sector: sectorId}).populate([
      'employee',
      'sector',
      'job',
    ])
  }
}
