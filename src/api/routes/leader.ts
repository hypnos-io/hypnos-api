import {Request, Router} from 'express'
import {LeaderRequest} from '../../domain/entities/leader'
import {Create} from '../../domain/use_cases/leader/Create'
import {DeleteById} from '../../domain/use_cases/leader/Delete'
import {FetchAll} from '../../domain/use_cases/leader/FetchAll'
import {FindById} from '../../domain/use_cases/leader/FindById'
import {Update} from '../../domain/use_cases/leader/Update'
import {MongoDBConnection} from '../services/mongodb/mdb_connection'
import {MongoDBLeaderService} from '../services/mongodb/mdb_leader_service'

export const LeaderRoutes = Router()

const PATH = '/leaders'

LeaderRoutes.get(PATH, async (request, response) => {
  try {
    const fecthAll = new FetchAll(
      new MongoDBLeaderService(new MongoDBConnection())
    )
    const allLeaders = await fecthAll.execute()
    return response.json(allLeaders)
  } catch (error: any) {
    return response.status(400).json({
      message: error?.message || 'Users not found',
      time: new Date(),
    })
  }
})

LeaderRoutes.get(
  `${PATH}/:id`,
  async (request: Request<{id: string}>, response) => {
    const {id} = request.params
    try {
      const findByIdUC = new FindById(
        new MongoDBLeaderService(new MongoDBConnection())
      )
      const foundLeaders = await findByIdUC.execute(id)
      return response.json(foundLeaders)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'User not found',
        time: new Date(),
      })
    }
  }
)

LeaderRoutes.delete(
  `${PATH}/:id`,
  async (request: Request<{id: string}>, response) => {
    const {id} = request.params
    try {
      const deleteUC = new DeleteById(
        new MongoDBLeaderService(new MongoDBConnection())
      )
      await deleteUC.execute(id)
      return response.status(200).json({
        message: `${id} deleted successfully`,
        time: new Date(),
      })
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Error on delete a leader',
        time: new Date(),
      })
    }
  }
)

LeaderRoutes.post(
  PATH,
  async (request: Request<unknown, unknown, LeaderRequest>, response) => {
    const newLeader = request.body
    try {
      const createUC = new Create(
        new MongoDBLeaderService(new MongoDBConnection())
      )
      const createdLeaders = await createUC.execute(newLeader)
      return response.json(createdLeaders)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Error on create a leader',
        time: new Date(),
      })
    }
  }
)

LeaderRoutes.patch(
  `${PATH}/:id`,
  async (
    request: Request<{id: string}, unknown, Partial<LeaderRequest>>,
    response
  ) => {
    const {id} = request.params
    const newLeader = request.body
    try {
      const updateUC = new Update(
        new MongoDBLeaderService(new MongoDBConnection())
      )
      const updatedLeader = await updateUC.execute(id, newLeader)
      return response.json(updatedLeader)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Error on update a leader',
        time: new Date(),
      })
    }
  }
)
