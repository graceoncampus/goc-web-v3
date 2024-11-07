import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

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
