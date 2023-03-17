import {IEmployeeService} from '../../ports/iemployee_service'

export class FindById {
  constructor(private readonly employeeService: IEmployeeService) {}

  async execute(supervisorId: string, id: string) {
    return this.employeeService.findById(supervisorId, id)
  }
}
