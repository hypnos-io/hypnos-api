import {ID} from '../entities/common'
import {Supervisor} from '../entities/supervisor'

export type OptionalSupervisor = Supervisor | undefined

export interface ISupervisorService {
  create(newSupervisor: Supervisor): Promise<OptionalSupervisor>
  fetchAll(): Promise<Supervisor[]>
  findById(id: ID): Promise<OptionalSupervisor>
  update(
    id: ID,
    newSupervisor: Partial<Supervisor>
  ): Promise<OptionalSupervisor>
  deleteById(id: ID): Promise<void>
}
