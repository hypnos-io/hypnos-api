import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import request from 'supertest'
import {UserRoutes} from '../../src/api/routes/user'
import {MongoDBConnection} from '../../src/api/services/mongodb/mdb_connection'
import {MongoDBLeaderService} from '../../src/api/services/mongodb/mdb_leader_service'
import {Create} from '../../src/domain/use_cases/leader/Create'

describe('Authentication (e2e)', () => {
  let app: express.Express

  beforeAll(() => {
    app = express()
    app.use(express.json())
    app.use(UserRoutes)
  })

  it('User should be authenticated', async () => {
    const createUC = new Create(
      new MongoDBLeaderService(new MongoDBConnection())
    )
    const registration = 'MAT12345'
    const password = 'TESTE1234'

    const createdLeader = await createUC.execute({
      registration,
      password,
      admissionDate: new Date(),
      firstName: 'Usuário',
      lastName: 'Teste',
    })

    const response = await request(app)
      .post('/login')
      .send({registration, password})
    expect(response.body['_id']).toBe(createdLeader._id)
    expect(response.statusCode).toBe(200)
  })
})
