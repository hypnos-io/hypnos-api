import {ID} from '../../entities/common'
import {Job} from '../../entities/job'
import {IJobService} from '../../ports/ijob_service'

export type JobRequest = Omit<
  Job,
  '_id' | 'createdAt' | 'updatedAt' | 'sector' | 'process'
>

export class Create {
  constructor(private readonly jobService: IJobService) {}

  async execute(processId: ID, newJob: JobRequest) {
    const createdJob = await this.jobService.create(processId, newJob)
    if (!createdJob) throw new Error('Erro ao criar nova atividade')
    return createdJob
  }
}
