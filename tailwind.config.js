const colors = require("tailwindcss/colors");
// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./node_modules/flowbite-react/**/*.js",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                gray: colors.neutral
            },
            fontFamily: {
                sans: ["var(--font-montserrat)"],
                display: ["var(--font-oxanium)"],
                body: ["var(--font-montserrat)"]
            },
            aspectRatio: {
                "4/3": "4 / 3",
                "3/2": "3 / 2",
                "2/3": "2 / 3",
                "9/16": "9 / 16"
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        require("@tailwindcss/typography")
        // require("flowbite/plugin")
    ]
};
