import {ISupervisorService} from '../../ports/isupervisor_service'

export class FetchAll {
  constructor(private readonly supervisorService: ISupervisorService) {}

  async execute() {
    const allSupervisors = await this.supervisorService.fetchAll()
    return allSupervisors
  }
}
