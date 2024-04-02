<script setup>
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
    </div>
</template>

<style>
body { scroll-behavior: smooth; }
</style>