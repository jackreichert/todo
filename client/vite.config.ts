import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'

type JSXConfig = {
  plugins: PluginOption[][];
} & {
  test: {
    environment: string;
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
} as JSXConfig);
