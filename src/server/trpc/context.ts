import type { inferAsyncReturnType } from "@trpc/server";
import type { createSolidAPIHandlerContext } from "solid-start-trpc";
// import { authenticator } from "../auth";

export const createContextInner = async (
  opts: createSolidAPIHandlerContext
) => {
  // const user = await authenticator.isAuthenticated(opts.req);
  // return {
  //   ...opts,
  //   user,
  // };
  // console.log("🟠", opts.req.headers);

  // @ts-expect-error
  opts.req.headers["Access-Control-Allow-Origin"] = "*";
  // @ts-expect-error
  opts.req.headers["Access-Control-Allow-Methods"] = "GET,OPTIONS,PATCH,DELETE,POST,PUT";
  // @ts-expect-error
  opts.req.headers["Access-Control-Allow-Headers"] = "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version";
  // @ts-expect-error
  opts.req.headers["Access-Control-Allow-Credentials"] = "true";
  return opts;

  
};

export const createContext = async (opts: createSolidAPIHandlerContext) => {
  return await createContextInner(opts);
};

export type IContext = inferAsyncReturnType<typeof createContext>;
