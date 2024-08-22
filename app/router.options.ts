import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else if (to.hash) {
            return {
                el: to.hash,
                behavior: "smooth",
            };
        } else {
            return { left: false, top: false };
        }
    },
};
