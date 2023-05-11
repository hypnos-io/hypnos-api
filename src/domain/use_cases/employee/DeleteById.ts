import {IEmployeeService} from '../../ports/iemployee_service'

export class DeleteById {
  constructor(private readonly employeeService: IEmployeeService) {}

  async execute(id: string) {
    return this.employeeService.deleteById(id)
  }
}
