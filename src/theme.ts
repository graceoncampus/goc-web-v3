import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

const headingRecipe = defineRecipe({
  variants: {
    size: {
      "6xl": {
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
        // blue: { value: "#3366cc" },
        // gray: { value: "#f7f7f7" },
        // black: { value: "#000000" },
        // white: { value: "#ffffff" },
      },
      fontSizes: {
        xs: { value: "0.75rem" }, // 12px
        sm: { value: "0.875rem" }, // 14px
        md: { value: "1rem" }, // 16px
        lg: { value: "1.125rem" }, // 18px
        xl: { value: "1.25rem" }, // 20px
        "2xl": { value: "1.5rem" }, // 24px
        "3xl": { value: "1.875rem" }, // 30px
        "4xl": { value: "2.25rem" }, // 36px
        "5xl": { value: "3rem" }, // 48px
        "6xl": { value: "3.75rem" }, // 60px
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
    // recipes: { heading: headingRecipe },
  },
});

export const system = createSystem(defaultConfig, config);
