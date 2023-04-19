import {ILeaderService} from '../../ports/ileader_service'
import {ISupervisorService} from '../../ports/isupervisor_service'
import {can} from '../authorization/can'

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
    if (foundSupervisors.length >= 1) {
      const supervisor = foundSupervisors[0]
      return {...supervisor, permissions: can(supervisor.role)}
    }
    const foundLeaders = await this.leaderService.fetchAll({
      registration,
      password,
    })
    if (foundLeaders.length >= 1) {
      const leader = foundLeaders[0]
      return {...leader, permissions: can(leader.role)}
    }
    throw new Error('Usuário ou senha incorretos.')
  }
}
