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
      git
        .init()
        .add('./*')
        .commit('first commit!')
        .addRemote(
          'origin',
          'https://github.com/hyperabstractor/simplegit-demo.git'
        )
        .push('origin', 'master')
      return {
        success: true,
        message: input.name + ' repo created',
      }
    }),
})
