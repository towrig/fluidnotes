import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const server = {};

// https://vitejs.dev/config/
export default defineConfig({
  server: server,
  resolve: {
    alias: {
      "@src": resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
});