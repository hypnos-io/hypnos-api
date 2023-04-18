import {Leader} from '../../entities/leader'
import {ILeaderService} from '../../ports/ileader_service'

export class Create {
  constructor(private readonly leaderService: ILeaderService) {}

  async execute(newLeader: Leader) {
    const createdLeader = await this.leaderService.create(newLeader)
    if (!createdLeader) throw new Error('Supervisor not created.')
    return createdLeader
  }
}
