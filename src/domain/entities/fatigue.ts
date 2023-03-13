import {Employee} from './employee'

export interface Fatigue {
  _id?: string
  description: string
  employee?: Employee
  createdAt?: Date
  updatedAt?: Date
}
