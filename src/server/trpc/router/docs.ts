//@ts-ignore
import fs from 'fs'
// import { pascalCase } from "studio/utils/util";
import { pascalCase } from 'change-case'

import { z } from 'zod'
import { db } from '~/config'
import { procedure, router } from '../utils'

export default router({
  newProject: procedure
    .input(
      z.object({
        name: z.string(),
        type: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const name = input.name
      const type = input.type
      console.log('🎯', name)
    }),

  publish: procedure
    .input(z.object({ name: z.string(), code: z.string(), css: z.string() }))
    .mutation(({ input }) => {
      // write file to disk
      const componentName = pascalCase(input.name)

      if (!fs.existsSync(`./src/routes/exports/${componentName}.tsx`)) {
        fs.mkdirSync(`./src/routes/exports`, { recursive: true })
      } else {
        fs.unlinkSync(`./src/routes/exports/${componentName}.tsx`)
      }

      if (!fs.existsSync(`./src/routes/exports/${componentName}.css`)) {
        fs.mkdirSync(`./src/routes/exports`, { recursive: true })
      } else {
        fs.unlinkSync(`./src/routes/exports/${componentName}.css`)
      }

      fs.writeFile(
        `./src/routes/exports/${componentName}.tsx`,
        input.code,
        function (err) {
          if (err) return console.log(err)
          console.log('could not write tsx file')
        }
      )
      fs.writeFile(
        `./src/routes/exports/${componentName}.css`,
        input.css,
        function (err) {
          if (err) return console.log(err)
          console.log('could not write css file')
        }
      )
      return {
        message: `published ${componentName}`,
        success: true,
      }
    }),
  saveDoc: procedure
    .input(
      z.object({
        name: z.string(),
        code: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const name = input.name
      const code = input.code
      console.log('🎯', name)
      const versions = await db
        .selectFrom('docs')
        .where('name', '=', name)
        .execute()
      if (versions.length > 0) {
        await db
          .updateTable('docs')
          .set({ deleted: 1 })
          .where('name', '=', name)
          .execute()
      }
      await db.insertInto('docs').values({ name, code, deleted: 0 }).execute()
      return {
        message: `saved ${name}`,
        success: true,
      }
    }),
  getRecentDocs: procedure
    .input(
      z.object({
        offset: z.number().optional(),
        limit: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const offset = input.offset || 0
      const limit = input.limit || 10
      const docs = await db
        .selectFrom('docs')
        .select(['id', 'name'])
        .where('deleted', '!=', 1)
        .offset(offset)
        .limit(limit)
        .orderBy('id', 'desc')
        .execute()
      return docs
    }),
  getAllDocs: procedure
    .input(
      z.object({
        offset: z.number().optional(),
        limit: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const offset = input.offset || 0
      const limit = input.limit || 10
      const docs = await db
        .selectFrom('docs')
        .select(['id', 'name'])
        .offset(offset)
        .limit(limit)
        .orderBy('id', 'desc')
        .execute()
      return docs
    }),
  getDoc: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const id = input.id
      if (!id) return null
      const doc = await db
        .selectFrom('docs')
        .selectAll()
        .where('id', '=', id as any)
        .execute()
      return doc[0]
    }),
  removeDoc: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const id = input.id
      await db
        .deleteFrom('docs')
        .where('id', '=', id as any)
        .execute()
      return {
        message: `deleted ${id}`,
        success: true,
      }
    }),
})
