import mongoose, {Schema} from 'mongoose'
import {DB_URL} from '../../../constants'
import {ID} from '../../../domain/entities/common'
import {Job} from '../../../domain/entities/job'
import {IJobService, OptionalJob} from '../../../domain/ports/ijob_service'
import {Connection} from '../connection'

const JobSchema = new Schema<Job>(
  {
    name: String,
    durationInHours: Number,
    endAt: Date,
    startAt: Date,
    epis: [String],
    sector: {type: Schema.Types.ObjectId, ref: 'Sectors'},
    process: {type: Schema.Types.ObjectId, ref: 'Processes'},
  },
  {timestamps: true}
)

const JobModel = mongoose.model('Jobs', JobSchema)

export class MongoDBJobService implements IJobService {
  constructor(private readonly connection: Connection) {}

  async connect(): Promise<void> {
    if (!DB_URL) throw new Error('DB URL not found.')
    const isConnected = await this.connection.connect(DB_URL)
    if (!isConnected) throw new Error('DB not connected')
  }

  async create(processId: ID, newJob: Job): Promise<OptionalJob> {
    await this.connect()
    return (await JobModel.create({...newJob, process: processId})).populate([
      'process',
      'sector',
    ])
  }

  async fetchAll(
    processId: ID,
    filters: Partial<Omit<Job, '_id'>>
  ): Promise<Job[]> {
    await this.connect()
    return JobModel.find({...filters, process: processId}).populate([
      'process',
      'sector',
    ])
  }

  async update(
    processId: ID,
    id: string,
    newJob: Partial<Job>
  ): Promise<OptionalJob> {
    await this.connect()
    return JobModel.findOneAndUpdate(
      {_id: id, process: processId},
      newJob
    ).populate(['process', 'sector'])
  }

  async deleteById(processId: ID, id: string): Promise<OptionalJob> {
    await this.connect()
    return JobModel.findOneAndDelete({_id: id, process: processId}).populate(
      'process'
    )
  }

  async findById(processId: ID, id: string): Promise<OptionalJob> {
    await this.connect()
    return JobModel.findOne({_id: id, process: processId}).populate([
      'process',
      'sector',
    ])
  }
}
