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
      },
    },
  ],
})

export default config
