import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { components } from "@aws-amplify/ui-react";

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
      "@": "/src",
      components: "/src/components",
      hooks: "/src/hooks",
      pages: "/src/pages",
      layouts: "/src/layouts",
      constants: "/src/constants",
      auth: "/src/auth",
      store: "/src/store",
      "ui-components": "/src/ui-components",
    },
  },
});
