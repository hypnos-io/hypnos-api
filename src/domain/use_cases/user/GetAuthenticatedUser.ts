import {ID} from '../../entities/common'
import {Leader} from '../../entities/leader'
import {Supervisor} from '../../entities/supervisor'
import {ILeaderService} from '../../ports/ileader_service'
import {ISupervisorService} from '../../ports/isupervisor_service'

export class GetAuthenticatedUser {
  constructor(
    private readonly supevisorService: ISupervisorService,
    private readonly leaderService: ILeaderService
  ) {}

  async execute(userId: ID): Promise<Leader | Supervisor> {
    if (!userId) throw new Error('ID inválido ou usuário não autenticado.')
    const foundSupervisor = await this.supevisorService.findById(userId)
    if (foundSupervisor) return foundSupervisor
    const foundLeader = await this.leaderService.findById(userId)
    if (foundLeader) return foundLeader
    throw new Error(`Usuário '${userId}' não foi encontrado`)
  }
}
