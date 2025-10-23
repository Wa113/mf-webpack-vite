import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    federation({
      name: 'vite_provider',
      publicPath: 'http://localhost:5173/',
      manifest: {
        fileName: 'mf-manifest.json',
        filePath: "assets/"
      },
      filename: 'assets/remoteEntry.js',
      exposes: {
        './Button': './src/Button',
      },
      shared: {
        react: {
          singleton: true,
        },
        'react/': {
          singleton: true,
        },
      },
    }),
  ],
  build:{
    target: 'web'
  },
  server: {
    port: 5173,
    hmr : false
  }
})
