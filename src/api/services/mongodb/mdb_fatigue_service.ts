import mongoose, {Schema} from 'mongoose'
import {DB_URL} from '../../../constants'
import {Fatigue} from '../../../domain/entities/fatigue'
import {IFatigueService} from '../../../domain/ports/ifatigue_service'
import {Connection} from '../connection'

const FatigueSchema = new Schema<Fatigue>(
  {
    kssScale: Number,
    detection: Schema.Types.Mixed,
    employee: {type: Schema.Types.ObjectId, ref: 'Employees'},
  },
  {timestamps: true}
)

const FatigueModel = mongoose.model('Fatigues', FatigueSchema)

export class MongoDBFatigueService implements IFatigueService {
  constructor(private readonly connection: Connection) {}

  async connect(): Promise<void> {
    if (!DB_URL) throw new Error('DB URL not found.')
    const isConnected = await this.connection.connect(DB_URL)
    if (!isConnected) throw new Error('DB not connected')
  }

  async create(newFatigue: Fatigue, employeeId: string): Promise<Fatigue> {
    await this.connect()
    const createdFatigue = await FatigueModel.create({
      ...newFatigue,
      employee: employeeId,
    })
    return createdFatigue
  }

  async findById(
    employeeId: string,
    id: string
  ): Promise<Fatigue | null | undefined> {
    await this.connect()
    return FatigueModel.findOne({employee: employeeId, _id: id})
  }

  async fetchAll(employeeId: string): Promise<Fatigue[]> {
    await this.connect()
    return FatigueModel.find({employee: employeeId})
  }

  async deleteById(employeeId: string, id: string): Promise<void> {
    await this.connect()
    await FatigueModel.deleteOne({employee: employeeId, _id: id})
  }

  async deleteAllByEmployeeId(employeeId: string): Promise<void> {
    await this.connect()
    await FatigueModel.deleteMany({employee: employeeId})
  }
}
