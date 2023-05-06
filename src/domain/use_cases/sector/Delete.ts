import {ID} from '../../entities/common'
import {ISectorService} from '../../ports/isector_service'

export class DeleteById {
  constructor(private readonly sectorService: ISectorService) {}

  async execute(id: ID) {
    await this.sectorService.deleteById(id)
  }
}
