import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react";

const headingRecipe = defineRecipe({
  variants: {
    size: {
      h1: {
        fontSize: "6xl",
        fontWeight: "bold",
        lineHeight: "1.2",
      },
      h2: {
        fontSize: "4xl",
        fontWeight: "semibold",
        lineHeight: "1.3",
      },
      h3: {
        fontSize: "2xl",
        fontWeight: "medium",
        lineHeight: "1.4",
      },
      h4: {
        fontSize: "xl",
        fontWeight: "medium",
        lineHeight: "1.5",
      },
    },
  },
});

const config = defineConfig({
  globalCss: {
    body: {
      margin: 0,
      padding: 0,
      outline: 0,
      textRendering: "optimizeSpeed",
      lineHeight: "1.5",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
    a: {
      textDecoration: "none",
    },
    code: {
      fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
    },
  },
  theme: {
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    tokens: {
      colors: {
        green: { value: "#3366cc" },
        gray: { value: "#f7f7f7" },
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: "{colors.red}" },
      },
    },
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
    recipes: { heading: headingRecipe },
  },
});

export const system = createSystem(defaultConfig, config);
