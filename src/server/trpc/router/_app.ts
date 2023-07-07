// @ts-ignore
import { t } from "../utils";
import collectionRouter from "./collections";
import recordsRouter from "./records";
import docsRouter from "./docs";
import exampleRouter from "./example";
import gitRouter from "./git-cli";
// import assetsRouter from "./assets";
// import tailwindRouter from "./tailwind";
export const appRouter = t.mergeRouters(
  collectionRouter,
  docsRouter,
  recordsRouter,
  exampleRouter,
  gitRouter
  // assetsRouter,
  // tailwindRouter
);

export type IAppRouter = typeof appRouter;
  