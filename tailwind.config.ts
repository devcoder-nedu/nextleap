import type {Config} from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "475px",
            },
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                black: {
                    100: "var(--color-black-100)",
                    200: "var(--color-black-200)",
                    300: "var(--color-black-300)",
                    DEFAULT: "var(--color-black)",
                },
                white: {
                    100: "var(--color-white-100)",
                    DEFAULT: "var(--color-white)",
                },
            },
            borderRadius: {
                lg: "var(--radius-lg)",
                md: "var(--radius-md)",
                sm: "var(--radius-sm)",
            },
            boxShadow: {
                100: "var(--shadow-100)",
                200: "var(--shadow-200)",
                300: "var(--shadow-300)",
            },
            fontFamily: {
                "work-sans": ["var(--font-work-sans)"],
            },
        },
    },
    plugins: [tailwindcssAnimate, typography ],
};

export default config;