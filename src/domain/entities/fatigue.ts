import {ID} from './common'
import {Employee} from './employee'

export interface FatigueDetectionInfo {
  mouth: Record<string, string | number>
  eyes: Record<string, string | number>
  head: Record<string, string | number>
}

export interface FatigueStatus {
  kssScale: number
  detection: FatigueDetectionInfo
}

export interface Fatigue extends FatigueStatus {
  _id?: ID
  employee?: Employee
  createdAt?: Date
  updatedAt?: Date
}
