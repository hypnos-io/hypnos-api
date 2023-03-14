import {ID} from '../entities/common'
import {Employee} from '../entities/employee'

export interface IEmployeeService {
  create(newEmployee: Employee, supervisorId: ID): Promise<Employee>
}
