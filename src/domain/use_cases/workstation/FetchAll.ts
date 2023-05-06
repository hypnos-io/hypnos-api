import {ID} from '../../entities/common'
import {IWorkstationService} from '../../ports/iworkstation_service'

export class FetchAll {
  constructor(private readonly workstationService: IWorkstationService) {}

  async execute(sectorId: ID) {
    return this.workstationService.fetchAll(sectorId, {})
  }
}
