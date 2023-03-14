import {DB_URL} from '../../../constants'
import {ID} from '../../../domain/entities/common'
import {Supervisor} from '../../../domain/entities/supervisor'
import {User} from '../../../domain/entities/user'
import {
  ISupervisorService,
  OptionalSupervisor,
} from '../../../domain/ports/isupervisor_service'
import {Connection} from '../connection'

export class MongoDBSupervisorService implements ISupervisorService {
  constructor(private readonly connection: Connection) {}

  async connect(): Promise<void> {
    if (!DB_URL) throw new Error('DB URL not found.')
    const isConnected = await this.connection.connect(DB_URL)
    if (!isConnected) throw new Error('DB not connected')
  }

  async fetchAll(): Promise<User[]> {
    return []
  }

  async findById(id: ID): Promise<OptionalSupervisor> {
    throw new Error('Method not implemented.')
  }

  async update(
    id: ID,
    newSupervisor: Partial<User>
  ): Promise<OptionalSupervisor> {
    throw new Error('Method not implemented.')
  }

  async deleteById(id: ID): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async create(newSupervisor: Supervisor): Promise<OptionalSupervisor> {
    throw new Error('Method not implemented.')
  }
}
