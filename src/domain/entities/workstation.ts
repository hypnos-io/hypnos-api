import {ID} from './common'
import {Employee} from './employee'
import {Sector} from './sector'

export interface Workstation {
  _id?: ID
  value: string
  sector?: Sector
  employee?: Employee
  cameraId?: string
  createdAt?: Date
  updatedAt?: Date
}
