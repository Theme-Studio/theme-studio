const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const scrollBarPlugin = require("./plugins/scrollbar.plugin");

module.exports = {
  content: [
    "../../packages/ui/src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      grid: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMElEQVQ4T2N89uzZfwY8QFJSEp80A+OoAcMiDP7//483HTx//hx/Ohg1gIFx6IcBALl+VXknOCvFAAAAAElFTkSuQmCC")',
    },
    extend: {
      colors: {
        gray: {
          900: "#202225",
          800: "#2f3136",
          700: "#36393f",
          600: "#4f545c",
          400: "#d4d7dc",
          300: "#e3e5e8",
          200: "#ebedef",
          100: "#f2f3f5",
        },
      },
      spacing: {
        1.875: "1.875rem",
        5.5: "1.375rem",
        8.75: "2.1875rem",
        12.5: "3.125rem",
        30: "7.5rem",
        62.5: "15.625rem",
      },
      textColor: {
        titlebar: "rgb(204, 204, 204)",
      },
      backgroundColor: {
        "dialog-overlay": "rgba(0, 0, 0, 0.48)",
      },
      padding: {
        1.25: "0.3125rem",
        "10px": "10px",
      },
      margin: {
        "7px": "7px",
        0.25: "0.1875rem",
      },
      width: {
        0.25: "0.0625rem",
        4.5: "1.125rem",
        "remote-icon": "34px",
      },
      maxWidth: {
        48: "12rem",
      },
      minWidth: {
        9: "2.25rem",
        10: "2.5rem",
      },
      height: {
        0.25: "0.0625rem",
        4.5: "1.125rem",
        content: "calc(100% - 52px)",
      },
      minHeight: {
        9: "2.25rem",
        56: "17rem",
        96: "24rem",
        24: "24px",
      },
      lineHeight: {
        5.5: "1.375rem",
      },
      fontSize: {
        "11px": "11px",
        "13px": "13px",
        titlebar: "13px",
        variable: "14px",
        sideBarTitle: "11px",
        badge: "10px",
      },
      transitionProperty: {
        input: "border 0.2s ease 0s, color 0.2s ease 0s",
      },
      boxShadow: {
        variable: "0 4px 4px rgba(0, 0, 0, .25)",
      },
      inset: {
        badge: "9px",
        "-4.5": "-1.125",
      },
      fontFamily: {
        roboto: "Roboto, sans-serif",
      },
    },
  },
  variants: {
    extend: {
      cursor: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {};

      const sizes = [0, 1, 2, 3, 4, 5, 6];

      sizes.forEach((size) => {
        newUtilities[`.treeindent-${size}`] = {
          left: `calc(-1.875rem * ${size + 1} + 0.75rem)`,
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "1px",
          height: "100%",
          backgroundColor: "red",
          marginLeft: "-1px",
        };
      });

      addUtilities(newUtilities);
    }),
    scrollBarPlugin,
  ],
};
