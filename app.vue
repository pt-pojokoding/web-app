<script setup lang="ts">
const authStore = useAuthStore();
const isLoading = computed(() => authStore.isLoading);
</script>

<template>
    <div>
        <NuxtLayout>      
            <UiLoadingScreen v-if="isLoading" />
            <NuxtPage v-else></NuxtPage>
            <NuxtLoadingIndicator />
        </NuxtLayout>
        <UNotifications />
    </div>
</template>

<style>
body { scroll-behavior: smooth; }
</style>