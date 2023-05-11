import {Request, Router} from 'express'
import {EmployeeRequest} from '../../domain/entities/employee'
import {Create} from '../../domain/use_cases/employee/Create'
import {DeleteById} from '../../domain/use_cases/employee/DeleteById'
import {FetchAll} from '../../domain/use_cases/employee/FetchAll'
import {FindById} from '../../domain/use_cases/employee/FindById'
import {Update} from '../../domain/use_cases/employee/Update'
import {MongoDBConnection} from '../services/mongodb/mdb_connection'
import {MongoDBEmployeeService} from '../services/mongodb/mdb_employee_service'

export const EmployeeRouter = Router()
const PATH = '/employees'

EmployeeRouter.get(PATH, async (request, response) => {
  try {
    const fetchAllUC = new FetchAll(
      new MongoDBEmployeeService(new MongoDBConnection())
    )
    const allEmployees = await fetchAllUC.execute()
    return response.json(allEmployees)
  } catch (error: any) {
    return response.status(400).json({
      message: error?.message || 'Users not found.',
      date: new Date(),
    })
  }
})

EmployeeRouter.get(
  `${PATH}/:id`,
  async (request: Request<{id: string}>, response) => {
    const {id} = request.params
    try {
      const findByIdUC = new FindById(
        new MongoDBEmployeeService(new MongoDBConnection())
      )
      const foundEmployee = await findByIdUC.execute(id)
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
  async (request: Request<{id: string}>, response) => {
    const {id} = request.params
    try {
      const deleteUC = new DeleteById(
        new MongoDBEmployeeService(new MongoDBConnection())
      )
      await deleteUC.execute(id)
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
    request: Request<{id: string}, unknown, Partial<EmployeeRequest>>,
    response
  ) => {
    const {id} = request.params
    const newEmployee = request.body
    try {
      const updateUC = new Update(
        new MongoDBEmployeeService(new MongoDBConnection())
      )
      const updatedEmployee = await updateUC.execute(id, newEmployee)
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
  async (request: Request<unknown, unknown, EmployeeRequest>, response) => {
    const newEmployee = request.body
    try {
      const createUC = new Create(
        new MongoDBEmployeeService(new MongoDBConnection())
      )
      const createdEmployee = await createUC.execute(newEmployee)
      return response.json(createdEmployee)
    } catch (error: any) {
      return response.status(400).json({
        message: error?.message || 'Error on create an employee',
        date: new Date(),
      })
    }
  }
)
