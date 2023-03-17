import {Employee} from '../../entities/employee'
import {IEmployeeService} from '../../ports/iemployee_service'

export class Update {
  constructor(private readonly employeeService: IEmployeeService) {}

  async execute(
    supervisorId: string,
    id: string,
    newEmployee: Partial<Employee>
  ) {
    return this.employeeService.update(supervisorId, id, newEmployee)
  }
}
