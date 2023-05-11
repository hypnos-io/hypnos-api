import {Employee} from '../../entities/employee'
import {IEmployeeService} from '../../ports/iemployee_service'

export class Update {
  constructor(private readonly employeeService: IEmployeeService) {}

  async execute(id: string, newEmployee: Partial<Employee>) {
    const updatedEmployee = await this.employeeService.update(id, newEmployee)

    if (!updatedEmployee) throw new Error('Employee not updated')
    return updatedEmployee
  }
}
