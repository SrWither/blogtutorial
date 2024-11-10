import { Surreal } from 'surrealdb'

export const db = new Surreal()
const dbUrl: string = import.meta.env.VITE_SURREALDB

export const initDB = async (): Promise<void> => {
  await db.connect(dbUrl, {
    namespace: 'blog',
    database: 'blog',
  })
}
