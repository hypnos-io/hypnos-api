import {ID} from '../../entities/common'
import {Supervisor} from '../../entities/supervisor'
import {ISupervisorService} from '../../ports/isupervisor_service'

export class Update {
  constructor(private readonly supervisorService: ISupervisorService) {}

  async execute(id: ID, newSupervisor: Partial<Supervisor>) {
    const updatedSupervisor = await this.supervisorService.update(
      id,
      newSupervisor
    )
    if (updatedSupervisor === undefined)
      throw new Error(`User not updated with id ${id}`)
    return updatedSupervisor
  }
}
