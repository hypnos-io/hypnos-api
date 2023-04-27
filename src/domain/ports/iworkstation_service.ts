import {ID} from '../entities/common'
import {Workstation} from '../entities/workstation'

export type OptionalWorkstation = Workstation | undefined | null

export type WorkstationFilter = Partial<Omit<Workstation, '_id' | 'employee'>>

export interface IWorkstationService {
  create(newWorkstation: Workstation): Promise<OptionalWorkstation>
  update(
    id: ID,
    newWorkstation: Partial<Workstation>,
    employeeId?: ID
  ): Promise<OptionalWorkstation>
  fetchAll(filter: WorkstationFilter): Promise<Workstation[]>
  findById(id: ID): Promise<OptionalWorkstation>
  deleteById(id: ID): Promise<void>
}
