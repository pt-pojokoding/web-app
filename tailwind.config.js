module.exports = {
    theme: {
        extend: {
            colors: {
                primary: "#FF5271",
                second: "#FFF38C",
                bg: "#191825",
                "wild-watermelon": {
                    50: "#fff1f2",
                    100: "#ffe3e6",
                    200: "#ffccd4",
                    300: "#ffa1b0",
                    400: "#ff5271",
                    500: "#f93a62",
                    600: "#e7174c",
                    700: "#c30d3f",
                    800: "#a30e3c",
                    900: "#8b103a",
                    950: "#4e031b",
                },
                nobel: {
                    50: "#f8f8f8",
                    100: "#f0f0f0",
                    200: "#e5e3e3",
                    300: "#d2cfd0",
                    400: "#b0abac",
                    500: "#9c9798",
                    600: "#847e7f",
                    700: "#6d6869",
                    800: "#5c5859",
                    900: "#504c4d",
                    950: "#282727",
                },
            },
            fontFamily: {
                "space-mono": ["space-mono", "monospace"],
            },
            aspectRatio: {
                auto: "auto",
                square: "1 / 1",
                video: "16 / 9",
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        "p, li, ul, ol": {
                            fontSize: theme("fontSize.lg"),
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        // ...
    ],
    content: [],
};
