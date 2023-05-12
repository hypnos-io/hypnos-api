import {ID} from '../../entities/common'
import {IProcessService} from '../../ports/iprocess_service'

export class FindById {
  constructor(private readonly processService: IProcessService) {}

  async execute(id: ID) {
    const foundProcess = await this.processService.findById(id)
    if (!foundProcess) throw new Error(`Processo ${id} não foi encontrado`)
    return foundProcess
  }
}
