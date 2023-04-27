import {ID} from '../../entities/common'
import {Workstation} from '../../entities/workstation'
import {IWorkstationService} from '../../ports/iworkstation_service'

export class Update {
  constructor(private readonly workstationService: IWorkstationService) {}

  async execute(
    id: ID,
    newWorkstation: Partial<Workstation> & {employeeId?: ID}
  ) {
    const updatedWorkstation = await this.workstationService.update(
      id,
      newWorkstation,
      newWorkstation.employeeId
    )
    if (!updatedWorkstation) throw new Error(`User not updated with id ${id}`)
    return updatedWorkstation
  }
}
