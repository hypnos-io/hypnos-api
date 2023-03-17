import {ID} from '../../entities/common'
import {Employee} from '../../entities/employee'
import {IEmployeeService} from '../../ports/iemployee_service'

export class Create {
  constructor(private readonly employeeService: IEmployeeService) {}

  async execute(newEmployee: Employee, supervisorId: ID) {
    return this.employeeService.create(newEmployee, supervisorId)
  }
}
