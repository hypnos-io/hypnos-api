import {User} from './user'

export type Employee = User

export type EmployeeRequest = Omit<
  Employee,
  '_id' | 'createdAt' | 'updatedAt' | 'role'
>
