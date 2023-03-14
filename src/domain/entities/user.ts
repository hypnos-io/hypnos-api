import {ID} from './common'

export interface User {
  _id?: ID
  employeeId: string
  firstName: string
  lastName: string
  password: string
  admissionDate: Date
  createdAt?: Date
  updatedAt?: Date
}
