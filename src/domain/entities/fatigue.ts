import {ID} from './common'
import {Employee} from './employee'

export interface FatigueDetectionInfo {
  mouth: Record<string, string | number>
  eyes: Record<string, string | number>
  head: Record<string, string | number>
}

export enum KssScaleEnum {
  EXTREMELY_ALERT = 1,
  VERY_ALERT = 2,
  ALERT = 3,
  FAIRLY_ALERT = 4,
  NEITHER_ALERT_NOR_SLEEPY = 5,
  SOME_SIGNS_OF_SLEEPINESS = 6,
  SLEEPY_BUT_NOT_EFFORT_TO_KEEP_ALERT = 7,
  SLEEPY_SOME_EFFORT_TO_KEEP_ALERT = 8,
  VERY_SLEEPY = 9,
}

export interface FatigueStatus {
  kssScale: KssScaleEnum
  detection: FatigueDetectionInfo
}

export interface Fatigue extends FatigueStatus {
  _id?: ID
  employee?: Employee
  createdAt?: Date
  updatedAt?: Date
}
