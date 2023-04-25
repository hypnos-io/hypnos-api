import {ILeaderService} from '../../ports/ileader_service'

export class FetchAll {
  constructor(private readonly leaderService: ILeaderService) {}

  async execute() {
    const allSupervisors = await this.leaderService.fetchAll({})
    return allSupervisors
  }
}
