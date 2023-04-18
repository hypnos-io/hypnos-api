import {LeaderRequest} from '../../entities/leader'
import {ILeaderService} from '../../ports/ileader_service'
import {RolesEnum} from '../authorization/roles'

export class Create {
  constructor(private readonly leaderService: ILeaderService) {}

  async execute(newLeader: LeaderRequest) {
    const createdLeader = await this.leaderService.create({
      ...newLeader,
      role: RolesEnum.LEADER,
    })
    if (!createdLeader) throw new Error('Supervisor not created.')
    return createdLeader
  }
}
