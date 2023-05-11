import {ID} from '../entities/common'
import {Employee} from '../entities/employee'

export type OptionalEmployee = Employee | undefined | null

export type EmployeeFilter = Partial<Omit<Employee, '_id'>>

export interface IEmployeeService {
  create(newEmployee: Employee): Promise<OptionalEmployee>
  fetchAll(filters: EmployeeFilter): Promise<Employee[]>
  findById(id: ID): Promise<OptionalEmployee>
  update(id: ID, newEmployee: Partial<Employee>): Promise<OptionalEmployee>
  deleteById(id: ID): Promise<void>
}
