import { defineStore } from 'pinia'

export type AchievementState = {
  id: string;
  name: string;
  type: 'quiz' | 'exercise';
  description: string;
  icon: string;
  [key: string]: number | string; // Use a union type for dynamic properties
} & ({
  type: 'quiz';
  minQuiz: number;
} | {
  type: 'exercise';
  minExercise: number;
});

export const useMyAchievementStore = defineStore('achievement', () => {
  const userAchievementList = ref<AchievementState[] | null>(null)
  const achievementList = ref<AchievementState[] | null>(null)

  const userDoneQuizCount = ref(0)
  const userDoneExerciseCount = ref(0)

  const userQuizDoneCount = ref(0)
  const userExerciseDoneCount = ref(0)

  const setUserAchievement = (value: AchievementState[]) => {
    userAchievementList.value = value
  }

  const setAchievement = (value: AchievementState[]) => {
    achievementList.value = value
  }

  return {
    userAchievementList,
    achievementList,
    setUserAchievement,
    setAchievement,
    userQuizDoneCount,
    userExerciseDoneCount
  }
})
