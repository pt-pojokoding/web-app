<script setup lang="ts">
const achievementStore = useAchievementStore();
await achievementStore.fetchAllAchievements();
await achievementStore.fetchAllUsersFinishedAchievements();
achievementStore.populateUsersAchievementProgress();
</script>

<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Pencapaian</h1>
        <!-- Finished Achievements -->
        <div class="grid grid-cols-3 gap-4">
            <div
                class="border rounded-md px-4 py-2 flex gap-3 items-center"
                v-for="(achievement, i) in achievementStore.achievementList?.filter(achievement => achievementStore.usersAchievementList.some((userAch: any) => userAch.achievementId === achievement.id))"
                :key="i"
            >
                <Icon :name="achievement.icon" class="text-4xl" />
                <div>
                    <h2 class="text-2xl font-semibold">{{ achievement.name }}</h2>
                    <p>{{ achievement.description }}</p>
                </div>
            </div>
        </div>

        <h2 class="text-2xl font-semibold mt-8 mb-4">Pencapaian yang belum diraih</h2>

        <!-- Unfinished Achievements -->
        <div class="grid grid-cols-3 gap-4">
            <div
                class="border rounded-md px-4 pt-2 pb-3 flex gap-3 items-center"
                v-for="(achievement, index) in achievementStore.achievementList?.filter(achievement => !achievementStore.usersAchievementList.some((userAch: any) => userAch.achievementId === achievement.id))"
                :key="index"
            >
                <Icon :name="achievement.icon" class="text-4xl" />
                <div class="space-y-1 w-full">
                    <h2 class="text-2xl font-semibold">{{ achievement.name }}</h2>
                    <p>{{ achievement.description }}</p>
                    <div>
                        <div v-if="achievement.type === 'quiz'">
                            <p class="text-sm font-thin mb-1">
                                Kemajuan:
                                {{ achievementStore.usersAchievementProgress.quizProgress }} /
                                {{ achievement.minQuiz }}
                            </p>
                            <UProgress
                                :value="achievementStore.usersAchievementProgress.quizProgress"
                                :max="achievement.minQuiz"
                            />
                        </div>
                        <div v-else>
                            <p class="text-sm font-thin mb-1">
                                Kemajuan:
                                {{ achievementStore.usersAchievementProgress.exerciseProgress }} /
                                {{ achievement.minExercise }}
                            </p>
                            <UProgress
                                :value="achievementStore.usersAchievementProgress.exerciseProgress"
                                :max="achievement.minExercise"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
