import {Request, Router} from 'express'
import {Employee} from '../../domain/entities/employee'
import {Create} from '../../domain/use_cases/employee/Create'
import {DeleteById} from '../../domain/use_cases/employee/DeleteById'
import {FetchAll} from '../../domain/use_cases/employee/FetchAll'
import {FindById} from '../../domain/use_cases/employee/FindById'
import {Update} from '../../domain/use_cases/employee/Update'
import {MongoDBConnection} from '../services/mongodb/mdb_connection'
import {MongoDBEmployeeService} from '../services/mongodb/mdb_employee_service'

export const EmployeeRouter = Router()
const PATH = '/supervisors/:supervisorId/employees'

EmployeeRouter.get(
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

EmployeeRouter.get(
  `${PATH}/:id`,
  async (request: Request<{supervisorId: string; id: string}>, response) => {
    const {supervisorId, id} = request.params
    try {
      const findByIdUC = new FindById(
        new MongoDBEmployeeService(new MongoDBConnection())
      )
      const foundEmployee = await findByIdUC.execute(supervisorId, id)
      return response.json(foundEmployee)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'User not found.',
        date: new Date(),
      })
    }
  }
)

EmployeeRouter.delete(
  `${PATH}/:id`,
  async (request: Request<{supervisorId: string; id: string}>, response) => {
    const {supervisorId, id} = request.params
    try {
      const deleteUC = new DeleteById(
        new MongoDBEmployeeService(new MongoDBConnection())
      )
      await deleteUC.execute(supervisorId, id)
      return response.status(200).json({
        message: `${id} deleted successfully`,
        time: new Date(),
      })
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Error on delete an employee.',
        date: new Date(),
      })
    }
  }
)

EmployeeRouter.patch(
  `${PATH}/:id`,
  async (
    request: Request<
      {supervisorId: string; id: string},
      unknown,
      Partial<Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>>
    >,
    response
  ) => {
    const {supervisorId, id} = request.params
    const newEmployee = request.body
    try {
      const updateUC = new Update(
        new MongoDBEmployeeService(new MongoDBConnection())
      )
      const updatedEmployee = await updateUC.execute(
        supervisorId,
        id,
        newEmployee
      )
      return response.json(updatedEmployee)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Error on update an employee',
        date: new Date(),
      })
    }
  }
)

EmployeeRouter.post(
  PATH,
  async (
    request: Request<
      {supervisorId: string},
      unknown,
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
        message: error?.message || 'Error on create an employee',
        date: new Date(),
      })
    }
  }
)
