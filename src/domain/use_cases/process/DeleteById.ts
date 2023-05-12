import {ID} from '../../entities/common'
import {IProcessService} from '../../ports/iprocess_service'

export class DeleteById {
  constructor(private readonly processService: IProcessService) {}

  async execute(id: ID) {
    const deletedProcess = await this.processService.deleteById(id)
    if (!deletedProcess) throw new Error(`Erro ao deletar processo ${id}`)
    return deletedProcess
  }
}
