import {ID} from '../../entities/common'
import {Employee} from '../../entities/employee'
import {IEmployeeService} from '../../ports/iemployee_service'

export class Create {
  constructor(private readonly employeeService: IEmployeeService) {}

  async execute(newEmployee: Employee, supervisorId: ID) {
    const createdEmployee = await this.employeeService.create(
      newEmployee,
      supervisorId
    )
    if (!createdEmployee) throw new Error('Employee not created')
    return createdEmployee
  }
}
