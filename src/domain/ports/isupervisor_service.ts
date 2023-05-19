import {ID} from '../entities/common'
import {Supervisor} from '../entities/supervisor'

export type OptionalSupervisor = Supervisor | undefined | null

export type SupervisorFilter = Partial<Omit<Supervisor, '_id'>>

export interface ISupervisorService {
  create(newSupervisor: Supervisor): Promise<OptionalSupervisor>
  fetchAll(filter: SupervisorFilter): Promise<Supervisor[]>
  findById(id: ID): Promise<OptionalSupervisor>
  update(
    id: ID,
    newSupervisor: Partial<Supervisor>
  ): Promise<OptionalSupervisor>
  deleteById(id: ID): Promise<void>
  findByRegistration(registration: string): Promise<OptionalSupervisor>
}
