import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

const INPUT_DIR = resolve("frontend");
const OUTPUT_DIR = resolve("frontend/dist");

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],

  root: INPUT_DIR,

  base: "/static/",

  resolve: {
    alias: {
      "@": resolve(INPUT_DIR),
    },
  },

  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
  },

  build: {
    manifest: "manifest.json",
    emptyOutDir: true,
    outDir: OUTPUT_DIR,

    rollupOptions: {
      input: [
        resolve(INPUT_DIR, "js/main.js"),
        resolve(INPUT_DIR, "css/main.css"),
      ],
    },
  },
});