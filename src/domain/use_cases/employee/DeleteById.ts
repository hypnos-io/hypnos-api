import {IEmployeeService} from '../../ports/iemployee_service'

export class DeleteById {
  constructor(private readonly employeeService: IEmployeeService) {}

  async execute(supervisorId: string, id: string) {
    return this.employeeService.deleteById(supervisorId, id)
  }
}
