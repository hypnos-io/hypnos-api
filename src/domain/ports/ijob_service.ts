import {ID} from '../entities/common'
import {Job} from '../entities/job'

export type OptionalJob = Job | null | undefined

export type JobFilters = Partial<Omit<Job, '_id' | 'sector' | 'process'>>

export interface IJobService {
  create(processId: ID, newJob: Job): Promise<OptionalJob>
  fetchAll(processId: ID, filters: JobFilters): Promise<Job[]>
  update(processId: ID, id: ID, newJob: Partial<Job>): Promise<OptionalJob>
  deleteById(processId: ID, id: ID): Promise<OptionalJob>
  findById(processId: ID, id: ID): Promise<OptionalJob>
}
