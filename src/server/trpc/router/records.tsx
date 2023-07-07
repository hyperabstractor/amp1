import { z } from 'zod'
import { db } from '~/config'
import { procedure, router } from '../utils'

const getFields = async (tableName: string, fieldGroup: string) => {
  if (fieldGroup) {
    const meta = await db
      .selectFrom('collections')
      .select('fields')
      .where('name', '=', tableName)
      .execute()
    const allFields: any[] = meta[0].fields
    const groupFields = allFields.filter(
      (f: any) => f.settings[fieldGroup] === true
    )
    const fields = groupFields.map((f: any) => f.name)
    if (!fields.includes('id')) fields.push('id')
    return fields
  }
  return []
}

const getRecords = async (input: any) => {
  const collection = input.collection
  let fields = input.fields || []
  const fieldGroup = input.fieldGroup
  if (typeof fieldGroup !== 'undefined') {
    fields = await getFields(collection, fieldGroup)
  }
  // console.log("🟩", fields);
  const order = input.order || 'asc'
  let query = db.selectFrom(collection)
  if (fields.length > 0) query = query.select(fields)
  else query = query.selectAll()
  if (input.whereIn && input.whereIn.values?.length > 0) {
    query = query.where(input.whereIn.field, 'in', input.whereIn.values)
  }

  return await query
    .orderBy(input.orderBy || 'id', order)
    .limit(input.limit || 100)
    .offset(input.offset || 0)
    .execute()
}

export default router({
  getIdsFromCollection: procedure.input(z.string()).query(async ({ input }) => {
    const tableName = input
    const records = await db.selectFrom(tableName).select(['id']).execute()
    return records
  }),
  getLookupField: procedure
    .input(
      z.object({
        collection: z.string(),
        field: z.string(),
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const tableName = input.collection
      const field = input.field
      const records = await db
        .selectFrom(tableName)
        .select([field])
        .where('id', '=', input.id)
        .execute()
      return records?.[0]
    }),

  getRowsFromCollection: procedure
    .input(
      z.object({
        collection: z.string(),
        fields: z.array(z.string()).optional(),
        fieldGroup: z.string().optional(),
        orderBy: z.string().optional(),
        order: z.string().optional(),
        limit: z.number().optional(),
        offset: z.number().optional(),
        filter: z.any().optional(),
        whereIn: z
          .object({
            field: z.string(),
            values: z.array(z.any()),
          })
          .optional(),
      })
    )
    .query(async ({ input }) => {
      const records = await getRecords(input)
      return records
    }),

  getRowsFromMultipleCollections: procedure
    .input(
      z.object({
        collections: z.array(
          z.object({
            collection: z.string(),
            fields: z.array(z.string()).optional(),
            fieldGroup: z.string().optional(),
            orderBy: z.string().optional(),
            order: z.string().optional(),
            limit: z.number().optional(),
            offset: z.number().optional(),
            filter: z.any().optional(),
            whereIn: z
              .object({
                field: z.string(),
                values: z.array(z.any()),
              })
              .optional(),
          })
        ),
      })
    )
    .query(async ({ input }) => {
      const collections = input.collections
      const records = await Promise.all(
        collections.map(async (collection) => {
          return {
            name: collection.collection,
            data: await getRecords(collection),
          }
        })
      )
      return records
    }),

  addRowToCollection: procedure
    .input(
      z.object({
        collection: z.string(),
        data: z.any(),
      })
    )
    .mutation(async ({ input }) => {
      const tableName = input.collection
      console.log('🟩', input)
      const record = { ...input.data }
      record.created_at = new Date()
      const result = await db
        .insertInto(tableName)
        .values(record)
        .returning('id')
        .execute()
      return {
        data: result,
        message: `record added to ${tableName} with id ${JSON.stringify(
          result
        )}`,
        success: true,
      }
    }),
  updateDataInCollection: procedure
    .input(
      z.object({
        collection: z.string(),
        data: z.any(),
      })
    )
    .mutation(async ({ input }) => {
      const tableName = input.collection
      const record = input.data
      const result = await db
        .updateTable(tableName)
        .set(record)
        .where('id', '=', record.id)
        .returning('id')
        .execute()
      return {
        data: result,
        message: `record updated in ${tableName} with id ${JSON.stringify(
          result
        )}`,
        success: true,
      }
    }),
  deleteRowFromCollection: procedure
    .input(
      z.object({
        collection: z.string(),
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const tableName = input.collection
      const id = input.id
      await db.deleteFrom(tableName).where('id', '=', id).execute()
      return {
        data: true,
        message: `record deleted from ${tableName} with id ${id}`,
        success: true,
      }
    }),
  addRowsToCollection: procedure
    .input(
      z.object({
        collection: z.string(),
        rows: z.array(z.any()),
      })
    )
    .mutation(async ({ input }) => {
      const tableName = input.collection
      const rows = input.rows
      const result = await db
        .insertInto(tableName)
        .values(rows)
        .returning('id')
        .execute()
      return {
        data: result,
        message: `records added to ${tableName} with id ${JSON.stringify(
          result
        )}`,
        success: true,
      }
    }),
  getRecord: procedure
    .input(
      z.object({
        collection: z.string(),
        id: z.number(),
        fields: z.array(z.string()).optional(),
      })
    )
    .query(async ({ input }) => {
      const tableName = input.collection
      const id = input.id
      const fields = input.fields
      console.log('🟩', fields)

      let query = db.selectFrom(tableName)
      if (fields?.length) {
        query = query.select(fields)
      } else {
        query = query.selectAll()
      }

      const record = await query.where('id', '=', id).execute()
      return record[0]
    }),
  createRecord: procedure
    .input(
      z.object({
        collection: z.string(),
        data: z.any(),
      })
    )
    .mutation(async ({ input }) => {
      const tableName = input.collection
      const data = input.data
      const result = await db
        .insertInto(tableName)
        .values(data)
        .returning('id')
        .execute()
      return {
        data: result,
        message: `record created in ${tableName} with id ${JSON.stringify(
          result
        )}`,
        success: true,
      }
    }),
  deleteRecord: procedure
    .input(
      z.object({
        collection: z.string(),
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const tableName = input.collection
      const id = input.id
      await db.deleteFrom(tableName).where('id', '=', id).execute()
      return {
        data: true,
        message: `record deleted from ${tableName} with id ${id}`,
        success: true,
      }
    }),
})
