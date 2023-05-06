import {ID} from '../../entities/common'
import {Workstation} from '../../entities/workstation'
import {IWorkstationService} from '../../ports/iworkstation_service'

export class Create {
  constructor(private readonly workstationService: IWorkstationService) {}

  async execute(newWorkstation: Workstation, sectorId: ID) {
    const createdWorkstation = await this.workstationService.create(
      newWorkstation,
      sectorId
    )
    if (!createdWorkstation) throw new Error('Workstation not created')
    return createdWorkstation
  }
}
