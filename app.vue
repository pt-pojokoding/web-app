<script setup lang="ts">
const authStore = useAuthStore();
const isLoading = computed(() => authStore.isLoading);
</script>

<template>
    <div>
        <UiLoadingScreen v-if="isLoading" />
        <NuxtLayout v-else>
            <NuxtLoadingIndicator />
            <NuxtPage></NuxtPage>
        </NuxtLayout>
        <UNotifications />
        <script src="//cdn.loop11.com/embed.js" type="text/javascript" async="async"></script>
    </div>
</template>

<style>
body { scroll-behavior: smooth; }
</style>