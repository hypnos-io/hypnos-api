import {ID} from './common'
import {Employee} from './employee'

export interface Workstation {
  _id?: ID
  value: string
  employee?: Employee
  cameraId?: string
  createdAt?: Date
  updatedAt?: Date
}
