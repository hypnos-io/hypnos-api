import {ID} from '../../entities/common'
import {ISectorService} from '../../ports/isector_service'

export class FindById {
  constructor(private readonly sectorService: ISectorService) {}

  async execute(id: ID) {
    const foundSector = await this.sectorService.findById(id)
    if (!foundSector) throw new Error(`Sector not found with id ${id}`)
    return foundSector
  }
}
