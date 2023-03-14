import {ID} from './common'
import {Employee} from './employee'

export interface Fatigue {
  _id?: ID
  description: string
  employee?: Employee
  createdAt?: Date
  updatedAt?: Date
}
