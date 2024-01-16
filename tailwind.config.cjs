/** @type {import('tailwindcss').Config} */
export default {

    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#e400ff",
                    "secondary": "#009174",
                    "accent": "#0048ff",
                    "neutral": "#2d232a",
                    "base-100": "#262626",
                    "info": "#00c1df",
                    "success": "#00c261",
                    "warning": "#f79d00",
                    "error": "#ff9793",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
 
}

