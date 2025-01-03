import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

const headingRecipe = defineRecipe({
  base: {
    fontFamily: "'Poppins', sans-serif",
  },
  variants: {
    size: {
      h1: {
        fontSize: "6xl",
        fontWeight: "bold",
        lineHeight: "1.2",
      },
      h2: {
        fontSize: "5xl",
        fontWeight: "semibold",
        lineHeight: "1.3",
      },
      h3: {
        fontSize: "4xl",
        fontWeight: "semibold",
        lineHeight: "1.3",
      },
      h4: {
        fontSize: "3xl",
        fontWeight: "semibold",
        lineHeight: "1.3",
      },
      h5: {
        fontSize: "xl",
        fontWeight: "medium",
        lineHeight: "1.4",
      },
    },
  },
});

const config = defineConfig({
  globalCss: {
    "*, *::before, *::after, *:before, *:after": {
      boxSizing: "border-box",
    },
    body: {
      minHeight: "100vh",
      margin: 0,
      padding: 0,
      outline: 0,
      textRendering: "optimizeSpeed",
      lineHeight: "1.5",
      fontFamily: "'Poppins', sans-serif",
    },
    a: {
      textDecoration: "none",
      _hover: {
        textDecoration: "none",
      },
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
        goc: {
          blue: { value: "#3366cc" }, // rgb(51, 102, 204)
          gray: { value: "#f7f7f7" },
        },
      },
      sizes: {
        xs: { value: "2rem" }, // 32px
        sm: { value: "4rem" }, // 64px
        md: { value: "8rem" }, // 128px
        lg: { value: "12rem" }, // 192px
        xl: { value: "16rem" }, // 256px
        "2xl": { value: "24rem" }, // 384px
      },
      fontSizes: {
        "2xs": { value: "0.625rem" }, // 10px
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
        "7xl": { value: "4.5rem" }, // 72px
        "8xl": { value: "6rem" }, // 96px
        "9xl": { value: "8rem" }, // 128px
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
