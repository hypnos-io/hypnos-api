import {IEmployeeService} from '../../ports/iemployee_service'

export class FetchAll {
  constructor(private readonly employeeService: IEmployeeService) {}

  async execute() {
    return this.employeeService.fetchAll({})
  }
}
