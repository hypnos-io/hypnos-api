import {Request, Router} from 'express'
import {Employee} from '../../domain/entities/employee'
import {Create} from '../../domain/use_cases/employee/Create'
import {FetchAll} from '../../domain/use_cases/employee/FetchAll'
import {MongoDBConnection} from '../services/mongodb/mdb_connection'
import {MongoDBEmployeeService} from '../services/mongodb/mdb_employee_service'

export const EmmployeeRouter = Router()
const PATH = '/supervisors/:supervisorId/employees'

EmmployeeRouter.get(
  PATH,
  async (request: Request<{supervisorId: string}>, response) => {
    const {supervisorId} = request.params
    try {
      const fetchAllUC = new FetchAll(
        new MongoDBEmployeeService(new MongoDBConnection())
      )
      const allEmployees = await fetchAllUC.execute(supervisorId)
      return response.json(allEmployees)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Users not found.',
        date: new Date(),
      })
    }
  }
)

EmmployeeRouter.post(
  PATH,
  async (
    request: Request<
      {supervisorId: string},
      {},
      Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
    >,
    response
  ) => {
    const {supervisorId} = request.params
    const newEmployee = request.body
    try {
      const createUC = new Create(
        new MongoDBEmployeeService(new MongoDBConnection())
      )
      const createdEmployee = await createUC.execute(newEmployee, supervisorId)
      return response.json(createdEmployee)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Users not found.',
        date: new Date(),
      })
    }
  }
)
