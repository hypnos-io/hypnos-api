import {ID} from '../entities/common'
import {Sector} from '../entities/sector'

export type OptionalSector = Sector | undefined | null

export type SectorFilter = Partial<Omit<Sector, '_id'>>

export interface ISectorService {
  create(newSector: Sector): Promise<OptionalSector>
  update(id: ID, newSector: Partial<Sector>): Promise<OptionalSector>
  fetchAll(filter: SectorFilter): Promise<Sector[]>
  findById(id: ID): Promise<OptionalSector>
  deleteById(id: ID): Promise<void>
}
