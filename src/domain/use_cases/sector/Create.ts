import {Sector} from '../../entities/sector'
import {ISectorService} from '../../ports/isector_service'

export class Create {
  constructor(private readonly sectorService: ISectorService) {}

  async execute(newSector: Sector) {
    const createdSector = await this.sectorService.create(newSector)
    if (!createdSector) throw new Error('Sector not created')
    return createdSector
  }
}
