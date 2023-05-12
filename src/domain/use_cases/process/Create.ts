import {Process} from '../../entities/process'
import {IProcessService} from '../../ports/iprocess_service'

export type ProcessRequest = Omit<Process, '_id' | 'createdAt' | 'updatedAt'>

export class Create {
  constructor(private readonly processService: IProcessService) {}

  async execute(newProcess: ProcessRequest) {
    const createdProcess = await this.processService.create(newProcess)
    if (!createdProcess) throw new Error('Erro ao criar novo processo')
    return createdProcess
  }
}
