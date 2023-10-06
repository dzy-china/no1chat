import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import AutoImport from 'unplugin-auto-import/vite'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'com@': path.resolve(__dirname, './src/components')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
  plugins: [
      vue(),
      AutoImport({
          imports: ["vue"]
      }),
      electron({
          entry: [
              "electron/main.js",
              "electron/preload.js",
              "electron/TcpClient.js",
              "electron/WindowEvent.js",
          ]
      })
  ]
})
