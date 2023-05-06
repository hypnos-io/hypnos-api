import {ID} from '../../entities/common'
import {Sector} from '../../entities/sector'
import {ISectorService} from '../../ports/isector_service'

export class Update {
  constructor(private readonly sectorService: ISectorService) {}

  async execute(id: ID, newSector: Partial<Sector>) {
    const updatedSector = await this.sectorService.update(id, newSector)
    if (!updatedSector) throw new Error(`Sector not updated with id ${id}`)
    return updatedSector
  }
}
