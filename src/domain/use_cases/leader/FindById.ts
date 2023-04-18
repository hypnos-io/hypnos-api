import {ID} from '../../entities/common'
import {ILeaderService} from '../../ports/ileader_service'

export class FindById {
  constructor(private readonly leaderService: ILeaderService) {}

  async execute(id: ID) {
    const foundLeader = await this.leaderService.findById(id)
    if (!foundLeader) throw new Error(`User not found with id ${id}`)
    return foundLeader
  }
}
