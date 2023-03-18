import {Supervisor} from './supervisor'
import {User} from './user'

export interface Employee extends User {
  workstation: number
  supervisor?: Supervisor
}
