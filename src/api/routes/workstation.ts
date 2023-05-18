import {Request, Router} from 'express'
import {ID} from '../../domain/entities/common'
import {Workstation} from '../../domain/entities/workstation'
import {Create} from '../../domain/use_cases/workstation/Create'
import {DeleteById} from '../../domain/use_cases/workstation/Delete'
import {FetchAll} from '../../domain/use_cases/workstation/FetchAll'
import {FindById} from '../../domain/use_cases/workstation/FindById'
import {Update} from '../../domain/use_cases/workstation/Update'
import {MongoDBConnection} from '../services/mongodb/mdb_connection'
import {MongoDBWorkstationService} from '../services/mongodb/mdb_workstation_service'

export const WorkstationRoutes = Router()

const PATH = '/workstations'

WorkstationRoutes.get(
  PATH,
  async (request: Request<{sectorId: ID}>, response) => {
    const {sectorId} = request.params
    try {
      const fetchAllUC = new FetchAll(
        new MongoDBWorkstationService(new MongoDBConnection())
      )
      const allWorkstation = await fetchAllUC.execute(sectorId)
      return response.json(allWorkstation)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Workstations not found.',
        date: new Date(),
      })
    }
  }
)

WorkstationRoutes.post(
  PATH,
  async (
    request: Request<{sectorId: ID}, unknown, {value: string}, unknown>,
    response
  ) => {
    const {sectorId} = request.params
    const {value} = request.body
    try {
      const createUC = new Create(
        new MongoDBWorkstationService(new MongoDBConnection())
      )
      const createdWorkstation = await createUC.execute({value}, sectorId)
      return response.json(createdWorkstation)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Workstations not created.',
        date: new Date(),
      })
    }
  }
)

WorkstationRoutes.get(
  `${PATH}/:id`,
  async (
    request: Request<{id: string; sectorId: ID}, unknown, unknown, unknown>,
    response
  ) => {
    const {id, sectorId} = request.params
    try {
      const findByIdUC = new FindById(
        new MongoDBWorkstationService(new MongoDBConnection())
      )
      const foundWorkstation = await findByIdUC.execute(id, sectorId)
      return response.json(foundWorkstation)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Workstations not found.',
        date: new Date(),
      })
    }
  }
)

WorkstationRoutes.delete(
  `${PATH}/:id`,
  async (
    request: Request<{id: string; sectorId: ID}, unknown, unknown, unknown>,
    response
  ) => {
    const {id, sectorId} = request.params
    try {
      const deleteUC = new DeleteById(
        new MongoDBWorkstationService(new MongoDBConnection())
      )
      await deleteUC.execute(id, sectorId)
      return response.status(200).send()
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Workstations not deleted.',
        date: new Date(),
      })
    }
  }
)

WorkstationRoutes.patch(
  `${PATH}/:id`,
  async (
    request: Request<
      {id: string; sectorId: ID},
      unknown,
      Partial<
        Omit<Workstation, '_id' | 'createdAt' | 'updatedAt' | 'employee'> & {
          employeeId: ID
        }
      >,
      unknown
    >,
    response
  ) => {
    const {id, sectorId} = request.params
    const newWorkstation = request.body
    try {
      const updateUC = new Update(
        new MongoDBWorkstationService(new MongoDBConnection())
      )
      const updatedWorkstation = await updateUC.execute(
        id,
        sectorId,
        newWorkstation
      )
      return response.json(updatedWorkstation)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Workstations not updated.',
        date: new Date(),
      })
    }
  }
)
