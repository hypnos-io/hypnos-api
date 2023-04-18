import {ILeaderService} from '../../ports/ileader_service'
import {ISupervisorService} from '../../ports/isupervisor_service'

export class Login {
  constructor(
    private readonly supevisorService: ISupervisorService,
    private readonly leaderService: ILeaderService
  ) {}

  async execute(registration: string, password: string) {
    const foundSupervisors = await this.supevisorService.fetchAll({
      registration,
      password,
    })
    if (foundSupervisors.length >= 1) return foundSupervisors[0]
    const foundLeaders = await this.leaderService.fetchAll({
      registration,
      password,
    })
    if (foundLeaders.length >= 1) return foundLeaders[0]
    throw new Error('Usuário ou senha incorretos.')
  }
}
