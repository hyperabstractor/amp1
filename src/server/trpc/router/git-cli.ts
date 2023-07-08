//@ts-ignore
import { z } from 'zod'
import fs from 'fs'
import { db } from '~/config'
import { procedure, router } from '../utils'
import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git'

const git = simpleGit()

// const app: App;
// const appId: string;
// const privateKey: string;
// const gitInstallationUrl: string;
// const installationId: string;
// const octokit: Octokit;

function onInit(err, initResult) {
  console.log('init result: ', initResult)
}
function onRemoteAdd(err, addRemoteResult) {
  console.log('remote add result: ', addRemoteResult)
}

export default router({
  createRepo: procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const USER = 'hyperabstractor'
      const PASS = 'nilsim1.MART'
      const REPO = 'github.com/hyperabstractor/amp1.git'
      const remote = `https://${USER}:${PASS}@${REPO}`

      try {
        // git
        //   .init()
        //   .addRemote('origin', remote)
        //   .add('./src/routes/exports')
        //   .commit('first commit!')
        //   .push('origin', 'master')

        simpleGit()
          .add('./*')
          .commit('first commit!')
          .addRemote('origin', remote)
          .push(['-u', 'origin', 'master'], () => console.log('done'))
      } catch (e) {
        console.log("🟩", e);
        /* handle all errors here */
      }

      // simpleGit()
      //   .clone(remote)
      //   .then(() => console.log('finished'))
      //   .catch((err) => console.error('failed: ', err))

      return {
        success: true,
        message: input.name + ' repo created',
      }
    }),
})
