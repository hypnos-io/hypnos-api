import {IEmployeeService} from '../../ports/iemployee_service'

export class FetchAll {
  constructor(private readonly employeeService: IEmployeeService) {}

  async execute(supervisorId: string) {
    return this.employeeService.fetchAll(supervisorId)
  }
}
