import * as dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import express from 'express'
import request from 'supertest'
import {UserRoutes} from '../../src/api/routes/user'
import {MongoDBConnection} from '../../src/api/services/mongodb/mdb_connection'
import {MongoDBLeaderService} from '../../src/api/services/mongodb/mdb_leader_service'
import {Create} from '../../src/domain/use_cases/leader/Create'
import {generateMockName} from '../utils/mock'

interface CookieValue {
  name: string
  value: string
}

function extractCookies(cookieHeaders: string[]): CookieValue[] {
  const cookies = cookieHeaders.map((cookie) => {
    const [name, value] = cookie.split('=')
    return {
      name,
      value,
    }
  })
  return cookies
}

describe('Authentication (e2e)', () => {
  let app: express.Express

  beforeAll(() => {
    app = express()
    app.use(express.json())
    app.use(cookieParser())
    app.use(UserRoutes)
  })

  it('User should be authenticated', async () => {
    const createUC = new Create(
      new MongoDBLeaderService(new MongoDBConnection())
    )
    const registration = generateMockName('MAT')
    const password = generateMockName('PASS')

    const createdLeader = await createUC.execute({
      registration,
      password,
      admissionDate: new Date(),
      firstName: 'Usuário',
      lastName: 'Teste',
    })

    const response = await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({registration, password})

    const cookies = extractCookies(response.headers['set-cookie'])
    expect(
      cookies.filter((cookie) => cookie.name === 'Authorization').length
    ).toBe(1)
    expect(response.body['_id']).toBe(createdLeader._id?.toString())
    expect(response.statusCode).toBe(200)
  })
})
