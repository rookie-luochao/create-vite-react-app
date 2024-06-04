import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: [["@babel/preset-react", { runtime: "automatic", importSource: "@emotion/react" }]],
        plugins: ["@emotion/babel-plugin"],
        babelrc: false,
        configFile: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@request": resolve(__dirname, "src/core/http/request.ts"),
    },
  },
});
