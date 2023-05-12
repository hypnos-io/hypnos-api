import {ID} from '../entities/common'
import {Process} from '../entities/process'

export type OptionalProcess = Process | null | undefined

export type ProcessFilters = Partial<Omit<Process, '_id'>>

export interface IProcessService {
  create(newProcess: Process): Promise<OptionalProcess>
  fetchAll(filters: ProcessFilters): Promise<Process[]>
  update(id: ID, newProcess: Partial<Process>): Promise<OptionalProcess>
  deleteById(id: ID): Promise<OptionalProcess>
  findById(id: ID): Promise<OptionalProcess>
}
