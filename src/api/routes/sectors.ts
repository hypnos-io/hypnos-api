import {Request, Router} from 'express'
import {ID} from '../../domain/entities/common'
import {Sector} from '../../domain/entities/sector'
import {Create} from '../../domain/use_cases/sector/Create'
import {DeleteById} from '../../domain/use_cases/sector/Delete'
import {FetchAll} from '../../domain/use_cases/sector/FetchAll'
import {FindById} from '../../domain/use_cases/sector/FindById'
import {Update} from '../../domain/use_cases/sector/Update'
import {MongoDBConnection} from '../services/mongodb/mdb_connection'
import {MongoDBSectorService} from '../services/mongodb/mdb_sector_service'

export const SectorRoutes = Router()

const PATH = '/sectors'

SectorRoutes.get(PATH, async (request, response) => {
  try {
    const fetchAllUC = new FetchAll(
      new MongoDBSectorService(new MongoDBConnection())
    )
    const allSector = await fetchAllUC.execute()
    return response.json(allSector)
  } catch (error: any) {
    return response.status(400).json({
      message: error?.message || 'Sectors not found.',
      date: new Date(),
    })
  }
})

SectorRoutes.post(
  PATH,
  async (
    request: Request<unknown, unknown, {value: string}, unknown>,
    response
  ) => {
    const {value} = request.body
    try {
      const createUC = new Create(
        new MongoDBSectorService(new MongoDBConnection())
      )
      const createdSector = await createUC.execute({value})
      return response.json(createdSector)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Sectors not created.',
        date: new Date(),
      })
    }
  }
)

SectorRoutes.get(
  `${PATH}/:id`,
  async (
    request: Request<{id: string}, unknown, unknown, unknown>,
    response
  ) => {
    const {id} = request.params
    try {
      const findByIdUC = new FindById(
        new MongoDBSectorService(new MongoDBConnection())
      )
      const foundSector = await findByIdUC.execute(id)
      return response.json(foundSector)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Sectors not found.',
        date: new Date(),
      })
    }
  }
)

SectorRoutes.delete(
  `${PATH}/:id`,
  async (
    request: Request<{id: string}, unknown, unknown, unknown>,
    response
  ) => {
    const {id} = request.params
    try {
      const deleteUC = new DeleteById(
        new MongoDBSectorService(new MongoDBConnection())
      )
      await deleteUC.execute(id)
      return response.status(200).send()
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Sectors not deleted.',
        date: new Date(),
      })
    }
  }
)

SectorRoutes.patch(
  `${PATH}/:id`,
  async (
    request: Request<
      {id: string},
      unknown,
      Partial<
        Omit<Sector, '_id' | 'createdAt' | 'updatedAt' | 'employee'> & {
          employeeId: ID
        }
      >,
      unknown
    >,
    response
  ) => {
    const {id} = request.params
    const newSector = request.body
    try {
      const updateUC = new Update(
        new MongoDBSectorService(new MongoDBConnection())
      )
      const updatedSector = await updateUC.execute(id, newSector)
      return response.json(updatedSector)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Sectors not updated.',
        date: new Date(),
      })
    }
  }
)
