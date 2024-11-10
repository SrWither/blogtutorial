import { type RecordId } from 'surrealdb'
import { authenticate } from './auth'
import { db } from './connect'

export type User = {
  id?: RecordId
  email: string
  username: string
  roles: RecordId[]
  password: string
}

export const getMyUser = async (token: string): Promise<User | null> => {
  try {
    const isAuthenticated = await authenticate(token)
    if (!isAuthenticated) {
      return null
    }

    const user = await db.info<User>()
    if (!user) {
      return null
    }

    return user
  } catch {
    return null
  }
}
