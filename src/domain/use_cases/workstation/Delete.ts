import {ID} from '../../entities/common'
import {IWorkstationService} from '../../ports/iworkstation_service'

export class DeleteById {
  constructor(private readonly workstationService: IWorkstationService) {}

  async execute(id: ID) {
    await this.workstationService.deleteById(id)
  }
}
