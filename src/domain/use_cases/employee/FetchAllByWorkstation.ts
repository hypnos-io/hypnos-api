import {ID} from '../../entities/common'
import {IWorkstationService} from '../../ports/iworkstation_service'

export class FetchAllByWorkstation {
  constructor(private readonly workstationService: IWorkstationService) {}

  async execute(sectorId: ID, jobId: ID) {
    return this.workstationService.fetchAllByJob(sectorId, jobId)
  }
}
