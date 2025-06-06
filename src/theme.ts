import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

const headingRecipe = defineRecipe({
  base: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: { sm: "2xl", xl: "3xl" },
    fontWeight: "semibold",
    lineHeight: "1.2",
    marginBottom: "1rem",
  },
});

const textRecipe = defineRecipe({
  base: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: { sm: "md", xl: "lg" },
    textWrap: "pretty",
    lineHeight: "1.8",
  },
});

const config = defineConfig({
  globalCss: {
    "*, *::before, *::after, *:before, *:after": {
      boxSizing: "border-box",
    },
    _selection: {
      background: "{colors.goc.blue}",
      color: "white",
    },
    body: {
      margin: 0,
      padding: 0,
      textRendering: "optimizeSpeed",
      lineHeight: "1.5",
      fontFamily: "'Poppins', sans-serif",
    },
    "a, button, [type='button'], [role='button']": {
      textDecoration: "none !important",
      outline: "none !important",
      _focus: {
        outline: "none !important",
      },
    },
    // // THIS ENABLES OUTLINE WHEN USER TABS (optional)
    // _focusVisible: {
    // outline: "2px solid black !important",
    // outlineOffset: "2px !important",
    // },
    _hover: {
      textDecoration: "none !important",
    },
  },
  theme: {
    breakpoints: {
      // base: 0-319px (optional)
      sm: "320px", // 320-767px (Mobile / Tablet)
      md: "768px", // 768-959px (Small screens)
      lg: "960px", // 960-1199px (Large screens)
      xl: "1200px", // 1200+px (XL screens)
    },
    tokens: {
      colors: {
        goc: {
          pale_blue: { value: "#E6F0FF" },
          bright_blue: { value: "#5A86D9" },
          blue: { value: "#3366CC" },
          dark_blue: { value: "#23478E" },
          gray: { value: "#F7F7F7" },
          orange: { value: "#CC9933" },
          pale_orange: { value: "#D1A347" },
          darkgray: { value: "lightgray" },
          beige: { value: "#FAF2E0" },
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
      fadeIn: {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
      fadeInUp: {
        from: {
          opacity: 0,
          transform: "translateY(10px)",
        },
        to: {
          opacity: 1,
          transform: "none",
        },
      },
      fadeInDown: {
        from: {
          opacity: 0,
          transform: "translateY(-5px)",
        },
        to: {
          opacity: 1,
          transform: "none",
        },
      },
    },
    recipes: { heading: headingRecipe, text: textRecipe },
  },
});

export const system = createSystem(defaultConfig, config);
