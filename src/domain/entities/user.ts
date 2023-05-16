import {RolesEnum} from '../use_cases/authorization/roles'
import {ID} from './common'

export interface User {
  _id?: ID
  registration: string
  fullName: string
  password: string
  admissionDate: Date
  role: RolesEnum
  imageURL: string
  createdAt?: Date
  updatedAt?: Date
}
