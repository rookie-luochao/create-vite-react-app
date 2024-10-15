import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@request': resolve(__dirname, 'src/core/http/request.ts'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {},
      },
    },
    modules: {
      // CSS Modules configuration
      localsConvention: 'camelCase', // Optional: To access class names in camelCase
      scopeBehaviour: 'local', // Default is 'local' for CSS Modules
      generateScopedName: '[name]__[local]___[hash:base64:5]', // Scoped class names
    },
  },
  esbuild: {
    drop: mode === 'development' ? [] : ['console', 'debugger'],
  },
}));
