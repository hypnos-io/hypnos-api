import {ID} from '../../entities/common'
import {ISupervisorService} from '../../ports/isupervisor_service'

export class DeleteById {
  constructor(private readonly supervisorService: ISupervisorService) {}

  async execute(id: ID) {
    await this.supervisorService.deleteById(id)
  }
}
