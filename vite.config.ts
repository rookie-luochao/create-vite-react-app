import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: [],
        plugins: [],
        babelrc: true,
        configFile: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@request": "./core/http/request.ts",
    },
  },
});
