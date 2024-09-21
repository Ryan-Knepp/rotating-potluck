import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "127.125.0.1",
    port: 8000,
    cors: {
      origin: false,
    },
    proxy: {
      "/login": {
        target: "http://127.125.0.1:3000",
        secure: false,
        changeOrigin: true,
        cookiePathRewrite: { "*": "/" },
      },
      "/logout": {
        target: "http://127.125.0.1:3000",
        changeOrigin: true,
        secure: false,
        cookiePathRewrite: { "*": "/" },
      },
      "/auth/complete": {
        target: "http://127.125.0.1:3000",
        changeOrigin: true,
        secure: false,
        cookiePathRewrite: { "*": "/" },
      },
    },
  },
});
