import {SupervisorRequest} from '../../entities/supervisor'
import {ISupervisorService} from '../../ports/isupervisor_service'
import {RolesEnum} from '../authorization/roles'

export class Create {
  constructor(private readonly supervisorService: ISupervisorService) {}

  async execute(newSupervisor: SupervisorRequest) {
    const createdSupervisor = await this.supervisorService.create({
      ...newSupervisor,
      role: RolesEnum.SUPERVISOR,
    })
    if (!createdSupervisor) throw new Error('Supervisor not created.')
    return createdSupervisor
  }
}
