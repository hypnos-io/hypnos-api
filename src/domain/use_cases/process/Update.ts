import {ID} from '../../entities/common'
import {Process} from '../../entities/process'
import {IProcessService} from '../../ports/iprocess_service'

export type ProcessUpdateRequest = Partial<
  Omit<Process, 'createdAt' | '_id' | 'updatedAt'>
>

export class Update {
  constructor(private readonly processService: IProcessService) {}

  async execute(id: ID, newProcess: ProcessUpdateRequest) {
    const updatedProcess = await this.processService.update(id, newProcess)
    if (!updatedProcess) throw new Error(`Erro ao atualizar processo ${id}`)
    return updatedProcess
  }
}
