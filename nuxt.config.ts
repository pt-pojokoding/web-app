// https://nuxt.com/docs/api/configuration/nuxt-config

const allFilesInsideFolder = (path: string) => {
    const fs = require("fs");
    const files = fs.readdirSync(path);
    return files.map((i: any) => path + i);
};

export default defineNuxtConfig({
    devtools: { enabled: false },
    modules: ["@pinia/nuxt", "@nuxtjs/sanity", "@nuxt/ui"],

    nitro: {
        firebase: {
            gen: 2,
        },
    },

    css: allFilesInsideFolder("assets/css/"),

    tailwindcss: {
        cssPath: "~/assets/css/tailwind.css",
        configPath: "tailwind.config",
        exposeConfig: false,
        exposeLevel: 2,
        config: {},
        injectPosition: "first",
        viewer: true,
    },

    sanity: {
        projectId: "diimhezu",
        apiVersion: "2021-10-21",
        dataset: "prod",
        useCdn: false,
    },

    compatibilityDate: "2024-11-21",
});
