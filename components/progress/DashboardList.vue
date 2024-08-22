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
        <div v-for="progress in progressStore.currentUserProgressDashboard" :key="progress._id">
            <UCard>
                <div class="flex gap-4">
                    <div>
                        <img
                            :src="progress.mainImage"
                            alt="Course Cover"
                            class="w-44 h-auto object-cover"
                        />
                    </div>
                    <div class="w-full flex flex-col gap-3">
                        <div class="flex justify-between">
                            <h2 class="text-xl font-bold">{{ progress.title }}</h2>
                            <span class="text-primary text-2xl font-bold"
                                >{{ progress.completionPercentage }}%</span
                            >
                        </div>
                        <UProgress :value="progress.completionPercentage"></UProgress>
                        <div class="flex justify-between">
                            <div class="flex gap-2">
                                <p>
                                    Artikel: {{ progress.finishedArticle }}/{{ progress.postCount }}
                                </p>
                                <p>
                                    Latihan: {{ progress.finishedExercise }}/{{
                                        progress.exerciseCount
                                    }}
                                </p>
                            </div>
                            <div class="flex items-center gap-2">
                                <UButton
                                    size="lg"
                                    variant="solid"
                                    color="gray"
                                    @click="isDaftarKontenModalOpen = true"
                                >
                                    Daftar Konten</UButton
                                >

                                <UModal v-model="isDaftarKontenModalOpen">
                                    <div class="p-4">
                                        <h2 class="text-xl font-bold mb-2">Daftar Konten {{ progress.title }}</h2>
                                        {{ progress.slug.current }}
                                        <UDivider class="mb-4"/>
                                        <ContentSidebarContents :courseSlug="progress.slug.current"></ContentSidebarContents>
                                    </div>
                                </UModal>   

                                <UButton
                                    @click="progressStore.continueLearning(progress._id)"
                                    size="lg"
                                    class="flex items-center"
                                >
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
