import {Permission} from './permissions'
import {RolesEnum} from './roles'

export type FeaturesByRole = {
  [Key in RolesEnum]: Permission[]
}

export const FEATURES: FeaturesByRole = {
  [RolesEnum.EMPLOYEE]: ['CREATE_EMPLOYEE'],
  [RolesEnum.SUPERVISOR]: ['CREATE_EMPLOYEE', 'VIEW_HISTORY_FATIGUE'],
  [RolesEnum.LEADER]: ['CREATE_EMPLOYEE', 'VIEW_WORKSTATION_STATUS'],
}

export function can(role: RolesEnum): Permission[] {
  return FEATURES[role]
}
