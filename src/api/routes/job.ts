import {Request, Router} from 'express'
import {ID} from '../../domain/entities/common'
import {Create, JobRequest} from '../../domain/use_cases/job/Create'
import {DeleteById} from '../../domain/use_cases/job/DeleteById'
import {FetchAll} from '../../domain/use_cases/job/FetchAll'
import {FindById} from '../../domain/use_cases/job/FindById'
import {JobUpdateRequest, Update} from '../../domain/use_cases/job/Update'
import {MongoDBConnection} from '../services/mongodb/mdb_connection'
import {MongoDBJobService} from '../services/mongodb/mdb_job_service'

export const JobRouter = Router()

const PATH = '/processes/:processId/jobs'

JobRouter.get(PATH, async (request: Request<{processId: ID}>, response) => {
  const {processId} = request.params
  try {
    const fecthAllUC = new FetchAll(
      new MongoDBJobService(new MongoDBConnection())
    )
    const allJobs = await fecthAllUC.execute(processId)
    return response.json(allJobs)
  } catch (error: any) {
    return response.status(400).json({
      message: error?.message || 'Jobs not found',
      time: new Date(),
    })
  }
})

JobRouter.post(
  PATH,
  async (request: Request<{processId: ID}, unknown, JobRequest>, response) => {
    const {processId} = request.params
    const newJob = request.body
    try {
      const createUC = new Create(
        new MongoDBJobService(new MongoDBConnection())
      )
      const createdJob = await createUC.execute(processId, newJob)
      return response.json(createdJob)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Error on create a new Job',
        time: new Date(),
      })
    }
  }
)

JobRouter.patch(
  `${PATH}/:id`,
  async (
    request: Request<{id: ID; processId: ID}, unknown, JobUpdateRequest>,
    response
  ) => {
    const {id, processId} = request.params
    const newJob = request.body
    try {
      const updateUC = new Update(
        new MongoDBJobService(new MongoDBConnection())
      )
      const updatedJob = await updateUC.execute(processId, id, newJob)
      return response.json(updatedJob)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Error on update a job',
        time: new Date(),
      })
    }
  }
)

JobRouter.get(
  `${PATH}/:id`,
  async (request: Request<{id: ID; processId: ID}>, response) => {
    const {id, processId} = request.params
    try {
      const findByIdUC = new FindById(
        new MongoDBJobService(new MongoDBConnection())
      )
      const foundJob = await findByIdUC.execute(processId, id)
      return response.json(foundJob)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Job not found',
        time: new Date(),
      })
    }
  }
)

JobRouter.delete(
  `${PATH}/:id`,
  async (request: Request<{id: ID; processId: ID}>, response) => {
    const {id, processId} = request.params
    try {
      const deleteByIdUC = new DeleteById(
        new MongoDBJobService(new MongoDBConnection())
      )
      const deletedJob = await deleteByIdUC.execute(processId, id)
      return response.json(deletedJob)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Job not deleted',
        time: new Date(),
      })
    }
  }
)
