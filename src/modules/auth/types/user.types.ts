import { User as UserBetter } from 'better-auth'

export type User = UserBetter

export interface SessionContextType {
  user: User | null
}
