import {Supervisor} from '../../entities/supervisor'
import {ISupervisorService} from '../../ports/isupervisor_service'

export class Create {
  constructor(private readonly supervisorService: ISupervisorService) {}

  async execute(newSupervisor: Supervisor) {
    const createdSupervisor = await this.supervisorService.create(newSupervisor)
    if (!createdSupervisor) throw new Error('Supervisor not created.')
    return createdSupervisor
  }
}
