import {ID} from '../../entities/common'
import {Workstation} from '../../entities/workstation'
import {IWorkstationService} from '../../ports/iworkstation_service'

export type WorkstationUpdateRequest = Partial<
  Omit<
    Workstation,
    '_id' | 'employee' | 'job' | 'sector' | 'createdAt' | 'updatedAt'
  > & {employeeId: ID; jobId: ID}
>

export class Update {
  constructor(private readonly workstationService: IWorkstationService) {}

  async execute(
    id: ID,
    sectorId: ID,
    newWorkstation: WorkstationUpdateRequest
  ) {
    const updatedWorkstation = await this.workstationService.update(
      id,
      sectorId,
      newWorkstation,
      newWorkstation.employeeId
    )
    if (!updatedWorkstation)
      throw new Error(`Workstation not updated with id ${id}`)
    return updatedWorkstation
  }
}
