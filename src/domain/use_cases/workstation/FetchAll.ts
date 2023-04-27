import {IWorkstationService} from '../../ports/iworkstation_service'

export class FetchAll {
  constructor(private readonly workstationService: IWorkstationService) {}

  async execute() {
    return this.workstationService.fetchAll({})
  }
}
