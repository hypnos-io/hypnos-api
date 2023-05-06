import {ISectorService} from '../../ports/isector_service'

export class FetchAll {
  constructor(private readonly sectorService: ISectorService) {}

  async execute() {
    return this.sectorService.fetchAll({})
  }
}
