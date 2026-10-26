import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Tailwind caches tailwind.config.js and the modules it imports (tokens/*.js) for the
// life of the Node process, so an in-process server.restart() isn't enough. Exit with 75
// and let scripts/dev.sh respawn vite in a fresh process.
const restartOnTokens = () => ({
  name: 'restart-on-tokens',
  configureServer(server) {
    server.watcher.add(['tailwind.config.js', 'tokens/**/*.js'])
    server.watcher.on('change', (file) => {
      if (/tailwind\.config\.js$|[\\/]tokens[\\/].+\.js$/.test(file)) {
        server.close().finally(() => process.exit(75))
      }
    })
  },
})

export default defineConfig({ plugins: [react(), restartOnTokens()] })
