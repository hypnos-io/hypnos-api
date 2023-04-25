import {ID} from '../../entities/common'
import {ILeaderService} from '../../ports/ileader_service'

export class DeleteById {
  constructor(private readonly leaderService: ILeaderService) {}

  async execute(id: ID) {
    await this.leaderService.deleteById(id)
  }
}
