<script setup>
const progressStore = useProgressStore();

await progressStore.fetchDashboardProgress();
const usersProgress = progressStore.currentUserProgressDashboard;
</script>

<template>
    <div v-for="progress in usersProgress" :key="progress._id">
        <UCard>
            <div class="flex">
                <div>
                    <img
                        :src="progress.mainImage"
                        alt="Course Cover"
                        class="w-44 h-auto object-cover"
                    />
                </div>
                <div class="w-full">
                    <div class="flex justify-between">
                        <h2 class="text-xl font-bold">{{ progress.title }}</h2>
                        <span class="text-primary text-2xl font-bold"
                            >{{ progress.completionPercentage }}%</span
                        >
                    </div>
                    <UProgress :value="progress.completionPercentage"></UProgress>
                    <div class="flex gap-2">
                        <p>Artikel: {{ progress.finishedArticle }}/{{ progress.postCount }}</p>
                        <p>Latihan: {{ progress.finishedExercise }}/{{ progress.exerciseCount }}</p>
                    </div>
                </div>
            </div>
        </UCard>
    </div>
</template>
