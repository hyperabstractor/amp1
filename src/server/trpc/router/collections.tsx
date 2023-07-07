import fs from 'fs'
import { z } from 'zod'
import { db } from '~/config'
import { procedure, router } from '../utils'

export default router({
  getCollections: procedure.query(async () => {
    const collections = await db
      .selectFrom('collections')
      // .select(['id', 'name', 'deleted'])
      .selectAll()
      .where('deleted', '!=', 1)
      .orderBy('id')
      .execute()

    return collections
  }),
  getDeletedCollections: procedure.query(async () => {
    const collections = await db
      .selectFrom('collections')
      .select(['id', 'name'])
      .where('deleted', '=', 1)
      .execute()

    return collections
  }),
  getCollection: procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const collection = await db
        .selectFrom('collections')
        .selectAll()
        .where('id', '=', input.id)
        .execute()
      return collection?.[0]
    }),
  getCollectionMeta: procedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const collection = await db
        .selectFrom('collections')
        .selectAll()
        .where('name', '=', input.name)
        .execute()
      return collection?.[0]
    }),
  updateFields: procedure
    .input(
      z.object({
        id: z.number(),
        fields: z.array(
          z.object({
            name: z.string(),
            dataType: z.string(),
            required: z.boolean().optional(),
            unique: z.boolean().optional(),
            default: z.string().optional(),
            settings: z.any().optional(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const id = input.id
      const fields = JSON.stringify(input.fields)
      await db
        .updateTable('collections')
        .set({ fields })
        .where('id', '=', id)
        .execute()
      return true
    }),
  addNewField: procedure
    .input(
      z.object({
        id: z.number(),
        field: z.object({
          name: z.string(),
          dataType: z.string(),
          required: z.boolean().optional(),
          unique: z.boolean().optional(),
          default: z.string().optional(),
          settings: z.any().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const id = input.id
      const field = input.field

      const collection = await db
        .selectFrom('collections')
        .selectAll()
        .where('id', '=', id)
        .execute()
      const fields = collection[0]?.fields ?? []
      fields.push(field)
      await db
        .updateTable('collections')
        .set({ fields: JSON.stringify(fields) })
        .where('id', '=', id)
        .execute()
      return {
        success: true,
        message: 'field added to collection',
      }
    }),
  updateField: procedure
    .input(
      z.object({
        id: z.number(),
        field: z.object({
          name: z.string(),
          dataType: z.string(),
          required: z.boolean().optional(),
          unique: z.boolean().optional(),
          default: z.string().optional(),
          settings: z.any().optional(),
        }),
        index: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const id = input.id
      const field = input.field
      const index = input.index

      const collection = await db
        .selectFrom('collections')
        .selectAll()
        .where('id', '=', id)
        .execute()
      const fields = collection[0]?.fields ?? []
      fields[index] = field
      await db
        .updateTable('collections')
        .set({ fields: JSON.stringify(fields) })
        .where('id', '=', id)
        .execute()
      return {
        success: true,
        message: 'field updated in collection',
      }
    }),
  removeField: procedure
    .input(
      z.object({
        id: z.number(),
        index: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const id = input.id
      const index = input.index

      const collection = await db
        .selectFrom('collections')
        .selectAll()
        .where('id', '=', id)
        .execute()
      const fields = collection[0]?.fields ?? []
      fields.splice(index, 1)
      await db
        .updateTable('collections')
        .set({ fields: JSON.stringify(fields) })
        .where('id', '=', id)
        .execute()
      return {
        success: true,
        message: 'field deleted from collection',
      }
    }),

  createCollection: procedure
    .input(
      z.object({
        name: z.string(),
        fields: z.array(z.object({ name: z.string(), dataType: z.string() })),
        description: z.string().optional(),
        force: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const name = input.name
      const description = input.description || ''
      const fieldArray = [
        {
          name: 'id',
          dataType: 'serial',
        },
        ...input.fields,
        {
          name: 'created_at',
          dataType: 'timestamp',
        },
      ]

      const fields = JSON.stringify(fieldArray)
      console.log('🎯', fields)

      const collections = await db
        .selectFrom('collections')
        .select('id')
        .where('name', '=', name)
        .execute()
      if (collections.length > 0) {
        // update
        const collection = await db
          .updateTable('collections')
          .set({ fields })
          .where('name', '=', name)
          .returning('id')
          .execute()
        return {
          data: collection[0],
          message: 'collection updated',
          success: true,
        }
      }
      const collection = await db
        .insertInto('collections')
        .values({ name, fields })
        .returning('id')
        .execute()
      return {
        data: collection[0],
        message: 'collection created',
        success: true,
      }
    }),
  deleteCollection: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const id = input.id
      await db
        .updateTable('collections')
        .set({ deleted: 1 })
        .where('id', '=', id)
        .execute()
      return {
        data: true,
        message: 'collection deleted',
        success: true,
      }
    }),
  restoreCollection: procedure.input(z.number()).mutation(async ({ input }) => {
    const id = input
    await db
      .updateTable('collections')
      .set({ deleted: 0 })
      .where('id', '=', id)
      .execute()
    return {
      data: true,
      message: 'collection restored',
      success: true,
    }
  }),
  deleteForeverCollection: procedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const id = input
      await db.deleteFrom('collections').where('id', '=', id).execute()
      return {
        data: true,
        message: 'collection deleted forever',
        success: true,
      }
    }),

  migrateCollection: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const id = input.id
      const collection = await db
        .selectFrom('collections')
        .select(['name', 'fields'])
        .where('id', '=', id)
        .execute()
      const table = collection[0].name
      const fields = collection[0].fields as any[]
      if (fields.length === 0)
        return {
          data: true,
          message: `no fields to migrate`,
          success: true,
        }
      await db.schema.dropTable(table).ifExists().cascade().execute()
      await db.schema
        .createTable(table)
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('created_at', 'timestamp', (col) => col.defaultTo('now()'))
        .execute()
      fields.forEach(async (field: any) => {
        let dataType = 'varchar'
        let fieldDataType = field.dataType.toLowerCase()
        let name = field.name
        if (name === 'id' || name === 'created_at') return

        switch (fieldDataType) {
          case 'file':
          case 'image':
            dataType = 'json'
            break
          case 'textarea':
            dataType = 'text'
            break
          case 'relation':
            const relatedTable = field.settings.relation
            dataType = `public.lookup`
            const column = field.name
            await db.schema
              .alterTable(table)
              .addColumn(column, dataType, (col) =>
                col
                  .references(`public.${relatedTable}.id`)
                  .onDelete('cascade')
                  .notNull()
              )
              .execute()

            const constraint = 'fk_' + column

            await db.schema
              .alterTable(table)
              .addForeignKeyConstraint(constraint, [column], relatedTable, [
                'id',
              ])
              .execute()
            return true
          case 'number':
          case 'numeric':
            dataType = 'int'
            break
          case 'boolean':
          case 'bool':
          // case "radio":
          // case "checkbox":
          case 'toggle':
            dataType = 'bool'
            break
          case 'select':
            const options = [...field.settings.options] as string[]
            dataType = `${table}_${field.name}`
            await db.schema.dropType(dataType).ifExists().execute()
            await db.schema.createType(dataType).asEnum(options).execute()
            break
          case 'json':
          case 'jsonb':
            dataType = 'json'
            break
          default:
            dataType = 'varchar'
            break
        }

        await db.schema
          .alterTable(table)
          .addColumn(field.name, dataType as any)
          .execute()
      })
      return {
        data: true,
        message: `Collection "${table}" migrated successfully`,
        success: true,
      }
    }),
  updateCollectionFieldSettings: procedure
    .input(
      z.object({
        id: z.number(),
        field: z.string(),
        settings: z.object({
          list: z.boolean().optional(),
          detail: z.boolean().optional(),
          form: z.boolean().optional(),
          table: z.boolean().optional(),
          card: z.boolean().optional(),
          lookup: z.boolean().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const collectionId = input.id
      const field = input.field
      const settings = input.settings
      const collectionData = await db
        .selectFrom('collections')
        .select('fields')
        .where('id', '=', collectionId)
        .execute()
      const fields = collectionData[0].fields as any[]
      const fieldIndex = fields.findIndex((f: any) => f.name === field)
      const prevSettings = fields[fieldIndex].settings
      fields[fieldIndex].settings = { ...prevSettings, ...settings }

      const updatedFields = JSON.stringify(fields)

      await db
        .updateTable('collections')
        .set({ fields: updatedFields })
        .where('id', '=', collectionId)
        .execute()

      return {
        data: true,
        success: true,
        message: 'Field settings updated',
      }
    }),
})
