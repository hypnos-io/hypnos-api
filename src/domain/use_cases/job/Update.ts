import {ID} from '../../entities/common'
import {Job} from '../../entities/job'
import {IJobService} from '../../ports/ijob_service'

export type JobUpdateRequest = Partial<
  Omit<Job, 'createdAt' | '_id' | 'updatedAt' | 'process' | 'sector'>
>

export class Update {
  constructor(private readonly jobService: IJobService) {}

  async execute(processId: ID, id: ID, newJob: JobUpdateRequest) {
    const updatedJob = await this.jobService.update(processId, id, newJob)
    if (!updatedJob) throw new Error(`Erro ao atualizar atividade ${id}`)
    return updatedJob
  }
}
