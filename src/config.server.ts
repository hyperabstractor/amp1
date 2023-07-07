import { createKysely } from '@vercel/postgres-kysely'
import dotenv from 'dotenv'
import { Generated } from 'kysely'

interface DocsTable {
  id: Generated<number>
  name: string
  code: string
  deleted: boolean
}
interface CollectionTable {
  id: Generated<number>
  name: string
  version: number
  fields: JSON
  description: string
  deleted: boolean
}

interface Database {
  docs: DocsTable
  collection: CollectionTable
}

export const db = createKysely<Database>()
export { sql } from 'kysely'
