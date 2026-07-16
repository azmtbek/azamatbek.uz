import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  plugins: [
    devtools(),
    nitro(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    {
      name: 'inject-tss-server-fn-base',
      transform(code, id) {
        if (id.includes('createClientRpc')) {
          return code
            .replace(/process\.env\.TSS_SERVER_FN_BASE/g, '"/_serverFn/"')
            .replace(/import\.meta\.env\.TSS_SERVER_FN_BASE/g, '"/_serverFn/"')
        }
        if (id.includes('serverFnFetcher')) {
          return code
            // Default content-type to application/json when the header is stripped
            .replace(
              'const contentType = response.headers.get("content-type");',
              'const contentType = response.headers.get("content-type") || "application/json";',
            )
            // Default serializedByStart to true when x-tss-serialized is absent
            // (/_serverFn/ responses are always seroval-serialized; Vercel strips the header)
            .replace(
              'const serializedByStart = !!response.headers.get(X_TSS_SERIALIZED);',
              'const serializedByStart = response.headers.has(X_TSS_SERIALIZED) ? !!response.headers.get(X_TSS_SERIALIZED) : true;',
            )
        }
      },
    },
  ],
})

export default config
