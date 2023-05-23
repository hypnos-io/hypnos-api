import {ID} from './common'
import {Employee} from './employee'
import {Job} from './job'
import {Sector} from './sector'

export interface Workstation {
  _id?: ID
  value: string
  sector?: Sector
  job?: Job
  employee?: Employee
  cameraId?: string
  createdAt?: Date
  updatedAt?: Date
}
