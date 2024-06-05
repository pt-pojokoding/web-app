// https://nuxt.com/docs/api/configuration/nuxt-config

const allFilesInsideFolder = (path: string) => {
    const fs = require("fs");
    const files = fs.readdirSync(path);
    return files.map((i: any) => path + i);
};

export default defineNuxtConfig({
    devtools: { enabled: false },
    // app: {
    //     head: {
    //         script: [
    //             {
    //                 src: "//cdn.loop11.com/embed.js",
    //                 type: "text/javascript",
    //                 async: true,
    //             },
    //         ],
    //     },
    // },

    modules: ["@pinia/nuxt", "@nuxtjs/sanity", "@nuxt/ui"],

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
});
