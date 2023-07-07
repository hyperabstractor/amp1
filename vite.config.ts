import solid from 'solid-start/vite'
import vercel from 'solid-start-vercel'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { loadEnv, defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'development') {
    const env = loadEnv(mode, process.cwd(), '')
    dotenvExpand.expand({ parsed: env })
  }
  return {
    plugins: [
      solid({
        ssr: true,
        adapter: vercel({
          edge: false,
        }),
      }),
    ],

    // server: {
    //   cors: {
    //     origin: '*',
    //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //     preflightContinue: false,
    //     allowedHeaders: [
    //       { key: 'Access-Control-Allow-Credentials', value: 'true' },
    //       { key: 'Access-Control-Allow-Origin', value: '*' },
    //       {
    //         key: 'Access-Control-Allow-Methods',
    //         value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    //       },
    //       {
    //         key: 'Access-Control-Allow-Headers',
    //         value:
    //           'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    //       },
    //     ],
    //   },
    // },
  }
})
