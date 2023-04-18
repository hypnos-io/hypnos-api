import {ID} from '../entities/common'
import {Leader} from '../entities/leader'

export type OptionalLeader = Leader | undefined | null

export type LeaderFilter = Partial<Omit<Leader, '_id'>>

export interface ILeaderService {
  create(newLeader: Leader): Promise<OptionalLeader>
  fetchAll(filter: LeaderFilter): Promise<Leader[]>
  findById(id: ID): Promise<OptionalLeader>
  update(id: ID, newLeader: Partial<Leader>): Promise<OptionalLeader>
  deleteById(id: ID): Promise<void>
}
