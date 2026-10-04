import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { viteSingleFile } from "vite-plugin-singlefile"

// Une seule page autonome (JS, CSS et images inline) : s'ouvre en file://, sur le dashboard ou en artifact.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
  build: { assetsInlineLimit: 100_000_000 },
})
