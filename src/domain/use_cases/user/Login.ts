import {Leader} from '../../entities/leader'
import {Supervisor} from '../../entities/supervisor'
import {ILeaderService} from '../../ports/ileader_service'
import {ISupervisorService} from '../../ports/isupervisor_service'
import {can} from '../authorization/can'
import {Permission} from '../authorization/permissions'

export type UserAuthenticated = (Leader | Supervisor) & {
  permissions?: Permission[]
}

export class Login {
  constructor(
    private readonly supevisorService: ISupervisorService,
    private readonly leaderService: ILeaderService
  ) {}

  async execute(
    registration: string,
    password: string
  ): Promise<UserAuthenticated> {
    const foundSupervisors = await this.supevisorService.fetchAll({
      registration,
      password,
    })
    if (foundSupervisors.length >= 1) {
      const supervisor: UserAuthenticated = foundSupervisors[0]
      supervisor.permissions = can(supervisor.role)
      return supervisor
    }
    const foundLeaders = await this.leaderService.fetchAll({
      registration,
      password,
    })
    if (foundLeaders.length >= 1) {
      const leader: UserAuthenticated = foundLeaders[0]
      leader.permissions = can(leader.role)
      return leader
    }
    throw new Error('Usuário ou senha incorretos.')
  }
}
