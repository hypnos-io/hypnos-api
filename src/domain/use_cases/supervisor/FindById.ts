import {ID} from '../../entities/common'
import {ISupervisorService} from '../../ports/isupervisor_service'

export class FindById {
  constructor(private readonly supervisorService: ISupervisorService) {}

  async execute(id: ID) {
    const foundSupervisor = await this.supervisorService.findById(id)
    if (foundSupervisor === undefined)
      throw new Error(`User not found with id ${id}`)
    return foundSupervisor
  }
}
