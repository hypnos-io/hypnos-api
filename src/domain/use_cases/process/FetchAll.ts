import {IProcessService} from '../../ports/iprocess_service'

export class FetchAll {
  constructor(private readonly processService: IProcessService) {}

  async execute() {
    return this.processService.fetchAll({})
  }
}
