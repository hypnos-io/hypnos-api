import {ID} from '../../entities/common'
import {IJobService} from '../../ports/ijob_service'

export class DeleteById {
  constructor(private readonly jobService: IJobService) {}

  async execute(processId: ID, id: ID) {
    const deletedJob = await this.jobService.deleteById(processId, id)
    if (!deletedJob) throw new Error(`Erro ao deletar atividade ${id}`)
    return deletedJob
  }
}
