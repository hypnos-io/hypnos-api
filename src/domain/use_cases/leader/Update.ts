import {ID} from '../../entities/common'
import {Leader} from '../../entities/leader'
import {ILeaderService} from '../../ports/ileader_service'

export class Update {
  constructor(private readonly leaderService: ILeaderService) {}

  async execute(id: ID, newLeader: Partial<Leader>) {
    const updatedLeader = await this.leaderService.update(id, newLeader)
    if (!updatedLeader) throw new Error(`User not updated with id ${id}`)
    return updatedLeader
  }
}
