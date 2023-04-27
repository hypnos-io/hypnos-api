import {ID} from '../../entities/common'
import {IWorkstationService} from '../../ports/iworkstation_service'

export class FindById {
  constructor(private readonly workstationService: IWorkstationService) {}

  async execute(id: ID) {
    const foundWorkstation = await this.workstationService.findById(id)
    if (!foundWorkstation)
      throw new Error(`Workstation not found with id ${id}`)
    return foundWorkstation
  }
}
