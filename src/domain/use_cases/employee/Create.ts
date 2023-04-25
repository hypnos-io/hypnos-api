import {ID} from '../../entities/common'
import {EmployeeRequest} from '../../entities/employee'
import {IEmployeeService} from '../../ports/iemployee_service'
import {RolesEnum} from '../authorization/roles'

export class Create {
  constructor(private readonly employeeService: IEmployeeService) {}

  async execute(newEmployee: EmployeeRequest, supervisorId: ID) {
    const createdEmployee = await this.employeeService.create(
      {
        ...newEmployee,
        role: RolesEnum.EMPLOYEE,
      },
      supervisorId
    )
    if (!createdEmployee) throw new Error('Employee not created')
    return createdEmployee
  }
}
