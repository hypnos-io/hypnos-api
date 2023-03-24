import {ID} from '../entities/common'
import {Fatigue} from '../entities/fatigue'

type OptionalFatigue = Fatigue | undefined | null

export interface IFatigueService {
  create(newFatigue: Fatigue, employeeId: ID): Promise<Fatigue>
  findById(employeeId: ID, id: ID): Promise<OptionalFatigue>
  fetchAll(employeeId: ID): Promise<Fatigue[]>
  deleteById(employeeId: ID, id: ID): Promise<void>
  deleteAllByEmployeeId(employeeId: ID): Promise<void>
}
