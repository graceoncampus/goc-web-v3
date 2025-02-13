import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/",
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    svgr(),
    viteTsconfigPaths(),
  ],
  server: {
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      pages: path.resolve(__dirname, "./src/pages"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      constants: path.resolve(__dirname, "./src/constants"),
      auth: path.resolve(__dirname, "./src/auth"),
      store: path.resolve(__dirname, "./src/store"),
      "ui-components": path.resolve(__dirname, "./src/ui-components"),
    },
  },
});
