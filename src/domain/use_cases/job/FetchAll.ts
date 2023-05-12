import {ID} from '../../entities/common'
import {IJobService} from '../../ports/ijob_service'

export class FetchAll {
  constructor(private readonly jobService: IJobService) {}

  async execute(processId: ID) {
    return this.jobService.fetchAll(processId, {})
  }
}
