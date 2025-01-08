<script setup>
const progressStore = useProgressStore();

await progressStore.fetchDashboardProgress();

const isDaftarKontenModalOpen = ref(false);
</script>

<template>
    <div>
        <div v-if="!progressStore.currentUserProgressDashboard">
            <p>Kamu belum memulai kursus</p>
        </div>
        <div v-for="progress in progressStore.currentUserProgressDashboard" :key="progress.id">
            <UCard>
                <div class="flex gap-4">
                    <div>
                        <img :src="progress.cover_image" alt="Course Cover" class="w-44 h-auto object-cover" />
                    </div>
                    <div class="w-full flex flex-col gap-3">
                        <div class="flex justify-between">
                            <h2 class="text-xl font-bold">{{ progress.title }}</h2>
                            <span class="text-primary text-2xl font-bold">{{ progress.completionPercentage }}%</span>
                        </div>
                        <UProgress :value="progress.completionPercentage"></UProgress>
                        <div class="flex justify-between">
                            <div class="flex gap-2">
                                <p>
                                    Artikel: {{ progress.finishedArticleCount }}/{{ progress.article_count }}
                                </p>
                                <p>
                                    Quiz: {{ progress.finishedQuizCount }}/{{
                                        progress.quiz_count
                                    }}
                                </p>
                                <p>
                                    Latihan: {{ progress.finishedExerciseCount }}/{{
                                        progress.exercise_count
                                    }}
                                </p>
                            </div>
                            <div class="flex items-center gap-2">
                                <UButton size="lg" variant="solid" color="gray" @click="isDaftarKontenModalOpen = true">
                                    Daftar Konten</UButton>

                                <UModal v-model="isDaftarKontenModalOpen">
                                    <div class="p-4">
                                        <h2 class="text-xl font-bold mb-2">{{ progress.title }}</h2>
                                        <UDivider class="mb-4" />
                                        <ContentSidebarContents :courseSlug="progress.slug" :courseId="progress.id">
                                        </ContentSidebarContents>
                                    </div>
                                </UModal>

                                <UButton @click="progressStore.continueLearning(progress.id)" size="lg" :loading="progressStore.isContinueLearningButtonLoading"
                                    class="flex items-center">
                                    Lanjut Belajar
                                    <UIcon name="i-heroicons-chevron-double-right" />
                                </UButton>
                            </div>
                        </div>
                    </div>
                </div>
            </UCard>
        </div>
    </div>
</template>
