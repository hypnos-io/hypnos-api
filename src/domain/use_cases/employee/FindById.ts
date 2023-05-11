import {IEmployeeService} from '../../ports/iemployee_service'

export class FindById {
  constructor(private readonly employeeService: IEmployeeService) {}

  async execute(id: string) {
    const foundEmployee = await this.employeeService.findById(id)
    if (!foundEmployee) throw new Error('Employee not found.')
    return foundEmployee
  }
}
