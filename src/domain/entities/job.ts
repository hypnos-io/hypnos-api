import {ID} from './common'
import {Process} from './process'
import {Sector} from './sector'

export interface Job {
  _id?: ID
  name: string
  employeeSize: number
  startAt: Date
  endAt: Date
  durationInHours: number
  epis: string[]
  sector?: Sector
  process?: Process
  createdAt?: Date
  updatedAt?: Date
}
