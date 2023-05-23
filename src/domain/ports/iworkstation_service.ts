import {ID} from '../entities/common'
import {Workstation} from '../entities/workstation'
import {WorkstationUpdateRequest} from '../use_cases/workstation/Update'

export type OptionalWorkstation = Workstation | undefined | null

export type WorkstationFilter = Partial<Omit<Workstation, '_id' | 'employee'>>

export interface IWorkstationService {
  create(
    newWorkstation: Workstation,
    sectorId: ID
  ): Promise<OptionalWorkstation>
  update(
    id: ID,
    sectorId: ID,
    newWorkstation: WorkstationUpdateRequest,
    employeeId?: ID
  ): Promise<OptionalWorkstation>
  fetchAll(sectorId: ID, filter: WorkstationFilter): Promise<Workstation[]>
  fetchAllByJob(sectorId: ID, jobId: ID): Promise<Workstation[]>
  findById(id: ID, sectorId: ID): Promise<OptionalWorkstation>
  deleteById(id: ID, sectorId: ID): Promise<void>
}
