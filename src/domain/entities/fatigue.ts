import {ID} from './common'
import {Employee} from './employee'

export interface FatigueDetectionInfo {
  mouth: Record<string, string | number>
  eyes: Record<string, string | number>
  head: Record<string, string | number>
}

export interface Fatigue {
  _id?: ID
  kssScale: number
  detection: FatigueDetectionInfo
  employee?: Employee
  createdAt?: Date
  updatedAt?: Date
}
