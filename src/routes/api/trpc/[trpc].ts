import { createSolidAPIHandler } from 'solid-start-trpc'
import { createContext } from '~/server/trpc/context'
import { appRouter } from '~/server/trpc/router/_app'

// import Cors from 'cors'
// const cors = Cors()

// function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result)
//       }

//       return resolve(result)
//     })
//   })
// }

// function withCors(handler: NextApiHandler) {
//   console.log("🟠", handler);
//   return async (req: NextApiRequest, res: NextApiResponse) => {
//     await runMiddleware(req, res, cors)

//     return await handler(req, res)
//   }
// }

// const handler = withCors(
//   createSolidAPIHandler({
//     router: appRouter,
//     createContext,
//   })
// )


const handler = createSolidAPIHandler({
  router: appRouter,
  createContext,
})

console.log("🟠", handler);

export const GET = handler
export const POST = handler
