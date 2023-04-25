import {User} from './user'

export interface Supervisor extends User {}

export type SupervisorRequest = Omit<
  Supervisor,
  '_id' | 'createdAt' | 'updatedAt' | 'role'
>
