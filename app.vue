<script setup lang="ts">
import { useMyAchievementStore } from '~/stores/achievement';
import { fetchAchievement } from './services/achievement/quiz';

const authStore = useAuthStore();
const isLoading = computed(() => authStore.isLoading);

onMounted(async () => {
    await fetchAchievement();
});
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