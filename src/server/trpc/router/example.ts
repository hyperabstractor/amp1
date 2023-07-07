//@ts-ignore
import { z } from "zod";
import { procedure, protectedProcedure, router } from "../utils";
import { db } from '~/config'

export default router({
  login: procedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(({ input }) => {
      return `Hello ${input.email}`;
    }),
  hello: procedure.input(z.object({ name: z.string() })).query(({ input }) => {
    return `Hello ${input.name}`;
  }),
  random: procedure
    .input(z.object({ num: z.number() }))
    .mutation(({ input }) => {
      return Math.floor(Math.random() * 100) / input.num;
    }),
    
  getCols: procedure
  .query(async ({ input }) => {
    const docs = await db
      .selectFrom("collections")
      .selectAll()
      .execute();
    return docs;
  }),
  // secret: protectedProcedure.query(({ ctx }) => {
  //   return `This is top secret - ${ctx.user.displayName}`;
  // }),
});
