import {ADMIN_PASS, ADMIN_REG} from '../../constants'
import {Create} from '../../domain/use_cases/user/Create'
import {MongoDBConnection} from '../services/mongodb/mdb_connection'
import {MongoDBSupervisorService} from '../services/mongodb/mdb_supervisor_service'

export function userSeeds() {
  const createUC = new Create(
    new MongoDBSupervisorService(new MongoDBConnection())
  )

  const pass = ADMIN_PASS
  const reg = ADMIN_REG

  if (!pass || !reg)
    throw new Error('Erro ao ler credenciais de usuário administrador.')

  return createUC.execute({
    name: 'admin',
    registration: reg,
    password: pass,
  })
}
