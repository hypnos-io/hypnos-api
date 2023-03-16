import {Router} from 'express'
import {FetchAll} from '../../domain/use_cases/supervisor/FetchAll'
import {MongoDBConnection} from '../services/mongodb/mdb_connection'
import {MongoDBSupervisorService} from '../services/mongodb/mdb_supervisor_service'

export const SupervisorRoutes = Router()

SupervisorRoutes.get('/supervisors', async (request, response) => {
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
