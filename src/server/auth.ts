import { serverEnv } from '~/env/server'

import GitProvider from '@auth/core/providers/github'
import type { SolidAuthConfig } from '@solid-auth/base'

export const authOptions: SolidAuthConfig = {
  providers: [
    GitProvider({
      clientId: serverEnv.GITHUB_ID as string,
      clientSecret: serverEnv.GITHUB_SECRET as string,
    }),
  ],
}

// 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

//
