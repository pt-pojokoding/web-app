import { getAllAchievements } from "~/services/achievement/achievements";
import { getAllUserAchievements } from "~/services/achievement/userAchievements";
import { addNewUserAchievement } from "~/services/achievement/addNewUserAchievement";
import { type Achievement } from "~/types/achievement";

export const useAchievementStore = defineStore("achievement", () => {
    const progressStore = useProgressStore();
    const contentStore = useContentStore();
    const authStore = useAuthStore();
    const toast = useToast();

    const achievementList = ref<Achievement[] | null>(null);
    const usersAchievementList = ref<any>(null);
    const usersAchievementProgress = ref<any>(null);

    async function fetchAllAchievements() {
        achievementList.value = await getAllAchievements();
    }

    async function fetchAllUsersFinishedAchievements() {
        usersAchievementList.value = await getAllUserAchievements();
    }

    function populateUsersAchievementProgress() {
        const quizAchievements = usersAchievementList.value.filter(
            (achievement: any) => achievement.type === "quiz"
        );
        const exerciseAchievements = usersAchievementList.value.filter(
            (achievement: any) => achievement.type === "exercise"
        );
        const quizProgress = quizAchievements.length;
        const exerciseProgress = exerciseAchievements.length;
        usersAchievementProgress.value = { quizProgress, exerciseProgress };
    }

    async function checkAchievement(){
        if(!achievementList.value){
            await fetchAllAchievements()
        }

        if(!progressStore.currentUserProgress){
            await progressStore.fetchCurrentUserProgress()
        }

        if(contentStore.currentContent?.contentType === "post"){
            // the count of currentUserProgress that has contentType post
            const quizProgressCount = progressStore.currentUserProgress.filter(
                (progress: any) => progress.contentType === "post"
            ).length;

            const achievementCompleted = achievementList.value?.filter((achievement: any) => {
                return achievement.minQuiz === quizProgressCount
            })
            
            if(achievementCompleted!.length > 0){
                const completedAchievementId = achievementCompleted![0].id
                await handleAddNewUserAchievement(completedAchievementId, "quiz", quizProgressCount)
            }
        }

        if(contentStore.currentContent?.contentType === "exercise"){
            // the count of currentUserProgress that has contentType exercise
            const exerciseProgressCount = progressStore.currentUserProgress.filter(
                (progress: any) => progress.contentType === "exercise"
            ).length;

            const achievementCompleted = achievementList.value?.filter((achievement: any) => {
                return achievement.minExercise === exerciseProgressCount
            })
        
            if(achievementCompleted){
                const completedAchievementId = achievementCompleted![0].id
                await handleAddNewUserAchievement(completedAchievementId, "exercise", exerciseProgressCount)
            }
        }

    }

    async function handleAddNewUserAchievement(achievementId: string, contentType: string, quizOrExerciseCount: number){
        await addNewUserAchievement(achievementId, authStore.user?.uid!, contentType)
        
        if(contentType === "quiz"){
            toast.add({
                title: "Keren!, kamu berhasil mendapatkan pencapaian baru👌",
                description: `Selamat! Anda telah menyelesaikan quiz sebanyak ${quizOrExerciseCount} Kali!`,
            });
        }

        if(contentType === "exercise"){
            toast.add({
                title: "Keren!, kamu berhasil mendapatkan pencapaian baru👌",
                description: `Selamat! Anda telah menyelesaikan latihan sebanyak ${quizOrExerciseCount} Kali!`,
            });
        }
    }

    return {
        achievementList,
        usersAchievementList,
        usersAchievementProgress,
        fetchAllAchievements,
        fetchAllUsersFinishedAchievements,
        populateUsersAchievementProgress,
        checkAchievement,
        handleAddNewUserAchievement,
    };
});
