import {User} from './user'

export interface Leader extends User {}

export type LeaderRequest = Omit<
  Leader,
  '_id' | 'createdAt' | 'updatedAt' | 'role'
>
