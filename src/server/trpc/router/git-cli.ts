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

export default router({
  createRepo: procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      const USER = 'hyperabstractor'
      const PASS = 'nilsim1.MART'
      const REPO = 'github.com/hyperabstractor/simplegit-demo.git'

      const remote = `https://${USER}:${PASS}@${REPO}`

      const status = git
        .init()
        .add('./*')
        .commit('first commit!')
        .addRemote('origin', remote)
        .push(['-u', 'origin', 'master'], () => console.log('xxxxxdone'));
        // .push('origin', 'master')

      console.log('🟢', status)
      return {
        success: true,
        message: input.name + ' repo created',
      }
    }),
})
