import mongoose, {Schema} from 'mongoose'
import {DB_URL} from '../../../constants'
import {Sector} from '../../../domain/entities/sector'
import {
  ISectorService,
  OptionalSector,
  SectorFilter,
} from '../../../domain/ports/isector_service'
import {Connection} from '../connection'

const SectorSchema = new Schema<Sector>(
  {
    value: String,
  },
  {timestamps: true}
)

const SectorModel = mongoose.model<Sector>('Sectors', SectorSchema)

export class MongoDBSectorService implements ISectorService {
  constructor(private readonly connection: Connection) {}

  async update(
    id: string,
    newSector: Partial<Sector>
  ): Promise<OptionalSector> {
    await this.connect()
    const updatedSector = await SectorModel.findOneAndUpdate(
      {_id: id},
      newSector
    )
    return updatedSector
  }

  async connect(): Promise<void> {
    if (!DB_URL) throw new Error('DB URL not found.')
    const isConnected = await this.connection.connect(DB_URL)
    if (!isConnected) throw new Error('DB not connected')
  }

  async create(newSector: Sector): Promise<Sector> {
    await this.connect()
    const createdSector = await SectorModel.create({
      ...newSector,
    })
    return createdSector
  }

  async findById(id: string): Promise<Sector | null | undefined> {
    await this.connect()
    return SectorModel.findOne({_id: id})
  }

  async fetchAll(filters: SectorFilter): Promise<Sector[]> {
    await this.connect()
    return SectorModel.find(filters)
  }

  async deleteById(id: string): Promise<void> {
    await this.connect()
    await SectorModel.deleteOne({_id: id})
  }
}
