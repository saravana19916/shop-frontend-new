/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

// Custom color with css variable color in __theme_color.scss
function customColors(cssVar) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${cssVar}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${cssVar}))`;
  };
}

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        "2xl": "128px",
      },
    },
    // fontFamily: {
    //   display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
    //   body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
    // },

    extend: {
      fontSize: {
        "16rem": "16rem",
        "17rem": "17rem",
        "18rem": "18rem",
        "19rem": "19rem",
        "20rem": "20rem",
        "21rem": "21rem",
        "22rem": "22rem",
        "23rem": "23rem",
        "24rem": "24rem",
        "20px": "1.25rem",
        "10px": "0.625rem",
        "11px": "0.6875rem",
        "23px": "1.4375rem",
        "25px": "1.5625rem",
        "27px": "1.6875rem",
      },
      spacing: {
        "-1rem": "-1rem",
        "-2rem": "-2rem",
        "-3rem": "-3rem",
        "-4rem": "-4rem",
        "-5rem": "-5rem",
        "-6rem": "-6rem",
        "-7rem": "-7rem",
        "-8rem": "-8rem",
        "-9rem": "-9rem",
        "-10rem": "-10rem",

        "0.5rem": "0.5rem",
        "0.6rem": "0.6rem",
        "0.7rem": "0.7rem",
        "0.8rem": "0.8rem",
        "0.9rem": "0.9rem",
        "1rem": "1rem",
        "2rem": "2rem",
        "3rem": "3rem",
        "4rem": "4rem",
        "5rem": "5rem",
        "6rem": "6rem",
        "7rem": "7rem",
        "8rem": "8rem",
        "9rem": "9rem",
        "10rem": "10rem",

        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        20: "5rem",
        21: "5.25rem",
        22: "5.5rem",
        23: "5.75rem",
        24: "6rem",
        25: "6.25rem",
        26: "6.5rem",
        27: "6.75rem",
        28: "7rem",
        29: "7.25rem",
        30: "7.5rem",
        31: "7.75rem",
        32: "8rem",
        33: "8.25rem",
        34: "8.5rem",
        35: "8.75rem",
        36: "9rem",
        37: "9.25rem",
        38: "9.5rem",
        39: "9.75rem",
        40: "10rem",
      },
      colors: {
        primary: {
          50: customColors("--c-primary-50"),
          100: customColors("--c-primary-100"),
          200: customColors("--c-primary-200"),
          300: customColors("--c-primary-300"),
          400: customColors("--c-primary-400"),
          500: customColors("--c-primary-500"),
          6000: customColors("--c-primary-600"),
          700: customColors("--c-primary-700"),
          800: customColors("--c-primary-800"),
          900: customColors("--c-primary-900"),
        },
        secondary: {
          50: customColors("--c-secondary-50"),
          100: customColors("--c-secondary-100"),
          200: customColors("--c-secondary-200"),
          300: customColors("--c-secondary-300"),
          400: customColors("--c-secondary-400"),
          500: customColors("--c-secondary-500"),
          6000: customColors("--c-secondary-600"),
          700: customColors("--c-secondary-700"),
          800: customColors("--c-secondary-800"),
          900: customColors("--c-secondary-900"),
        },
        neutral: {
          50: customColors("--c-neutral-50"),
          100: customColors("--c-neutral-100"),
          200: customColors("--c-neutral-200"),
          300: customColors("--c-neutral-300"),
          400: customColors("--c-neutral-400"),
          500: customColors("--c-neutral-500"),
          6000: customColors("--c-neutral-600"),
          700: customColors("--c-neutral-700"),
          800: customColors("--c-neutral-800"),
          900: customColors("--c-neutral-900"),
        },
        zinc: {
          100: customColors("--c-zinc-100"),
          150: "#F3F4F4",
          250: "#F8FAFB",
          350: "#F8F9F9",
        },
        grey: {
          100: "#eeeeee",
          350: "#ECECEC",
          500: "#B8B8B8",
          700: "#757985",
          450: "#4d515c", // place holder text color
          550: "#EAEAEA",
        },
        lightGrey: {
          100: "#F9FAFC",
          150: "#E7E7E7",
        },
        reddish: {
          500: "#F90055",
          600: "#FF003E",
        },
        greenish: {
          500: "#16d9c6",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
