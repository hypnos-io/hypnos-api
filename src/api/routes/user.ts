import {Request, Router} from 'express'
import {GetAuthenticatedUser} from '../../domain/use_cases/user/GetAuthenticatedUser'
import {Login} from '../../domain/use_cases/user/Login'
import {MongoDBConnection} from '../services/mongodb/mdb_connection'
import {MongoDBLeaderService} from '../services/mongodb/mdb_leader_service'
import {MongoDBSupervisorService} from '../services/mongodb/mdb_supervisor_service'

export const UserRoutes = Router()

UserRoutes.post(
  '/login',
  async (
    request: Request<
      unknown,
      unknown,
      {registration: string; password: string},
      unknown
    >,
    response
  ) => {
    const {password, registration} = request.body

    try {
      const mongoConnection = new MongoDBConnection()
      const loginUC = new Login(
        new MongoDBSupervisorService(mongoConnection),
        new MongoDBLeaderService(mongoConnection)
      )
      const userAuthenticated = await loginUC.execute(registration, password)
      return response
        .cookie('Authorization', userAuthenticated._id)
        .status(200)
        .json(userAuthenticated)
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Credenciais inváliadas',
      })
    }
  }
)

UserRoutes.post('/logout', async (request, response) => {
  try {
    return response.clearCookie('Authorization').status(200).json()
  } catch (error: any) {
    return response.status(400).json({
      message: error.message || 'Credenciais inváliadas',
    })
  }
})

UserRoutes.get('/authenticated', async (request, response) => {
  const {Authorization: userId} = request.cookies as {Authorization?: string}
  const mongoConnection = new MongoDBConnection()
  const getAuthenticatedUserUC = new GetAuthenticatedUser(
    new MongoDBSupervisorService(mongoConnection),
    new MongoDBLeaderService(mongoConnection)
  )
  try {
    if (!userId) throw new Error('Usuário inválido ou não autenticado')
    const foundUser = await getAuthenticatedUserUC.execute(userId)
    return response.status(200).json(foundUser)
  } catch (error: any) {
    return response.status(400).json({
      message: error.message || 'Credenciais inváliadas',
    })
  }
})
