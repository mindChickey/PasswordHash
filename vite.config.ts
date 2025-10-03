import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        popup: "./src/popup.ts",
        background: "./src/background.ts",
        contentScript: "./src/contentScript.ts",
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
    outDir: 'out'
  }
})
