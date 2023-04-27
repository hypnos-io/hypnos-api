import {Supervisor} from './supervisor'
import {User} from './user'

export interface Employee extends User {
  supervisor?: Supervisor
}

export type EmployeeRequest = Omit<
  Employee,
  '_id' | 'createdAt' | 'updatedAt' | 'role' | 'supervisor'
>
