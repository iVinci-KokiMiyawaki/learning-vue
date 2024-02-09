// import path from "path"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 4444,
    proxy: {
      "^/api": {
        target: "http://backend:5555",
        changeOrigin: true,
      },
    },
  },
})
