export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const authStore = useAuthStore();
        const router = useRouter();
        if (!authStore.user) {
            router.push("/masuk");
        }
    }
});