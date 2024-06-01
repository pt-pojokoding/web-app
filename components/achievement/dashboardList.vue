<script setup lang="ts">
import { all } from 'axios';
import type { DocumentData } from 'firebase/firestore';
import { getAchivementById } from '~/services/achievement/quiz';
import { useMyAchievementStore, type AchievementState } from '~/stores/achievement';

const userAchievementList2 = ref<AchievementState[] | null>(null);
const allAchievements = ref<AchievementState[] | null>(null);

const { userQuizDoneCount, userExerciseDoneCount } = storeToRefs(useMyAchievementStore())

async function fetchUserAchievementList() {
  const { userAchievementList, achievementList } = storeToRefs(useMyAchievementStore())
  userAchievementList2.value = (await Promise.all(userAchievementList.value!.map(async (doc: any) => await getAchivementById(doc.achievementId)))) as AchievementState[]
  allAchievements.value = achievementList.value?.filter((achievement: any) => !userAchievementList.value?.some((userAchievement: any) => userAchievement.achievementId === achievement.id))!
};

onMounted(async () => {
  await fetchUserAchievementList();

})
</script>

<template>
  <div class="">
    <div class="grid grid-cols-3 gap-4">
      <div class="border rounded-md px-4 py-2 flex gap-3 items-center" v-for="(achievement, i) of userAchievementList2"
        :key="i">
        <Icon :name="achievement.icon" class="text-4xl" />
        <div class="">
          <h2 class="text-2xl font-semibold">{{ achievement.name }}</h2>
          <p>{{ achievement.description }}</p>
        </div>
      </div>
    </div>
    <h1 class="text-2xl font-semibold mt-8 mb-4">Pencapaian yang belum diraih</h1>
    <div class="grid grid-cols-3 gap-4">
      <div class="border rounded-md px-4 pt-2 pb-3 flex gap-3 items-center" v-for="(achievement, i) of allAchievements"
        :key="i">
        <Icon :name="achievement.icon" class="text-4xl" />
        <div class="space-y-1 w-full">
          <h2 class="text-2xl font-semibold">{{ achievement.name }}</h2>
          <p>{{ achievement.description }}</p>
          <div class="">
            <div v-if="achievement.type == 'quiz'" class="">
              <p class="text-sm font-thin mb-1">Progress: {{ userQuizDoneCount }} / {{ achievement.minQuiz }}</p>
              <UProgress :value="userQuizDoneCount"
                :max="(achievement.minQuiz as number)" />
            </div>
            <div v-else class="">
              <p class="text-sm font-thin mb-1">Progress: {{ userExerciseDoneCount }} / {{ achievement.minExercise }}</p>
              <UProgress :value="userExerciseDoneCount" :max="(achievement.minExercise as number)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>