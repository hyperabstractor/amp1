import { db as localDB } from './config.local'
import { db as serverDB } from './config.server'

// export const db = process.env.NODE_ENV === 'production' ? serverDB : localDB
export const db = localDB
