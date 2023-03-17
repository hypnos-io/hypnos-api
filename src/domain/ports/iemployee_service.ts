import {ID} from '../entities/common'
import {Employee} from '../entities/employee'

export type OptionalEmployee = Employee | undefined | null

export interface IEmployeeService {
  create(newEmployee: Employee, supervisorId: ID): Promise<OptionalEmployee>
  fetchAll(supervisorId: ID): Promise<Employee[]>
  findById(supervisorId: ID, id: ID): Promise<OptionalEmployee>
  update(
    supervisorId: ID,
    id: ID,
    newEmployee: Partial<Employee>
  ): Promise<OptionalEmployee>
  deleteById(supervisorId: ID, id: ID): Promise<void>
}
