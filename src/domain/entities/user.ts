import {RolesEnum} from '../use_cases/authorization/roles'
import {ID} from './common'

export interface User {
  _id?: ID
  registration: string
  name: string
  password: string
  admissionDate: Date
  role: RolesEnum
  createdAt?: Date
  updatedAt?: Date
}
