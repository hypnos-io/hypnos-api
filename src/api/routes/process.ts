import {Request, Router} from 'express'
import {ID} from '../../domain/entities/common'
import {Create, ProcessRequest} from '../../domain/use_cases/process/Create'
import {DeleteById} from '../../domain/use_cases/process/DeleteById'
import {FetchAll} from '../../domain/use_cases/process/FetchAll'
import {FindById} from '../../domain/use_cases/process/FindById'
import {
  ProcessUpdateRequest,
  Update,
} from '../../domain/use_cases/process/Update'
import {MongoDBConnection} from '../services/mongodb/mdb_connection'
import {MongoDBProcessService} from '../services/mongodb/mdb_process_service'

export const ProcessRouter = Router()

const PATH = '/processes'

ProcessRouter.get(PATH, async (request, response) => {
  try {
    const fecthAllUC = new FetchAll(
      new MongoDBProcessService(new MongoDBConnection())
    )
    const allProcesses = await fecthAllUC.execute()
    return response.json(allProcesses)
  } catch (error: any) {
    return response.status(400).json({
      message: error?.message || 'Processes not found',
      time: new Date(),
    })
  }
})

ProcessRouter.post(
  PATH,
  async (request: Request<unknown, unknown, ProcessRequest>, response) => {
    const newProcess = request.body
    try {
      const createUC = new Create(
        new MongoDBProcessService(new MongoDBConnection())
      )
      const createdProcess = await createUC.execute(newProcess)
      return response.json(createdProcess)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Error on create a new process',
        time: new Date(),
      })
    }
  }
)

ProcessRouter.patch(
  `${PATH}/:id`,
  async (
    request: Request<{id: ID}, unknown, ProcessUpdateRequest>,
    response
  ) => {
    const {id} = request.params
    const newProcess = request.body
    try {
      const updateUC = new Update(
        new MongoDBProcessService(new MongoDBConnection())
      )
      const updatedProcess = await updateUC.execute(id, newProcess)
      return response.json(updatedProcess)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Error on update a process',
        time: new Date(),
      })
    }
  }
)

ProcessRouter.get(
  `${PATH}/:id`,
  async (request: Request<{id: ID}>, response) => {
    const {id} = request.params
    try {
      const findByIdUC = new FindById(
        new MongoDBProcessService(new MongoDBConnection())
      )
      const foundProcess = await findByIdUC.execute(id)
      return response.json(foundProcess)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Process not found',
        time: new Date(),
      })
    }
  }
)

ProcessRouter.delete(
  `${PATH}/:id`,
  async (request: Request<{id: ID}>, response) => {
    const {id} = request.params
    try {
      const deleteByIdUC = new DeleteById(
        new MongoDBProcessService(new MongoDBConnection())
      )
      const deletedProcess = await deleteByIdUC.execute(id)
      return response.json(deletedProcess)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Process not deleted',
        time: new Date(),
      })
    }
  }
)
