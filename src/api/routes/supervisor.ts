import {Request, Router} from 'express'
import {Supervisor} from '../../domain/entities/supervisor'
import {Create} from '../../domain/use_cases/supervisor/Create'
import {Delete} from '../../domain/use_cases/supervisor/Delete'
import {FetchAll} from '../../domain/use_cases/supervisor/FetchAll'
import {FindById} from '../../domain/use_cases/supervisor/FindById'
import {Update} from '../../domain/use_cases/supervisor/Update'
import {MongoDBConnection} from '../services/mongodb/mdb_connection'
import {MongoDBSupervisorService} from '../services/mongodb/mdb_supervisor_service'

export const SupervisorRoutes = Router()

const PATH = '/supervisors'

SupervisorRoutes.get(PATH, async (request, response) => {
  try {
    const fecthAll = new FetchAll(
      new MongoDBSupervisorService(new MongoDBConnection())
    )
    const allSupervisors = await fecthAll.execute()
    return response.json(allSupervisors)
  } catch (error: any) {
    return response.status(400).json({
      message: error?.message || 'Users not found',
      time: new Date(),
    })
  }
})

SupervisorRoutes.get(
  `${PATH}/:id`,
  async (request: Request<{id: string}>, response) => {
    const {id} = request.params
    try {
      const findByIdUC = new FindById(
        new MongoDBSupervisorService(new MongoDBConnection())
      )
      const foundSupervisor = await findByIdUC.execute(id)
      return response.json(foundSupervisor)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'User not found',
        time: new Date(),
      })
    }
  }
)

SupervisorRoutes.delete(
  `${PATH}/:id`,
  async (request: Request<{id: string}>, response) => {
    const {id} = request.params
    try {
      const deleteUC = new Delete(
        new MongoDBSupervisorService(new MongoDBConnection())
      )
      await deleteUC.execute(id)
      return response.status(200)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Error on delete a supervisor',
        time: new Date(),
      })
    }
  }
)

SupervisorRoutes.post(
  PATH,
  async (
    request: Request<
      unknown,
      unknown,
      Omit<Supervisor, 'id' | 'createdAt' | 'updatedAt'>
    >,
    response
  ) => {
    const newSupervisor = request.body
    try {
      const createUC = new Create(
        new MongoDBSupervisorService(new MongoDBConnection())
      )
      const createdSupervisor = await createUC.execute(newSupervisor)
      return response.json(createdSupervisor)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Error on create a supervisor',
        time: new Date(),
      })
    }
  }
)

SupervisorRoutes.patch(
  `${PATH}/:id`,
  async (
    request: Request<
      {id: string},
      unknown,
      Partial<Omit<Supervisor, 'id' | 'createdAt' | 'updatedAt'>>
    >,
    response
  ) => {
    const {id} = request.params
    const newSupervisor = request.body
    try {
      const updateUC = new Update(
        new MongoDBSupervisorService(new MongoDBConnection())
      )
      const updatedSupervisor = await updateUC.execute(id, newSupervisor)
      return response.json(updatedSupervisor)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Error on update a supervisor',
        time: new Date(),
      })
    }
  }
)
