import {ID} from '../../entities/common'
import {IJobService} from '../../ports/ijob_service'

export class FindById {
  constructor(private readonly jobService: IJobService) {}

  async execute(processId: ID, id: ID) {
    const foundJob = await this.jobService.findById(processId, id)
    if (!foundJob) throw new Error(`Atividade ${id} não foi encontrada`)
    return foundJob
  }
}
