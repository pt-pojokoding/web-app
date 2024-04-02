// @ts-nocheck
import { saveProgressService } from "~/services/progress/saveProgress";
import { getCurrentUserProgress } from "~/services/progress/getCurrentUserProgress";
import { getCurrentUserAllProgress } from "~/services/progress/getCurrentUserAllProgress";

export const useProgressStore = defineStore("progress", () => {
    const authStore = useAuthStore();
    const contentStore = useContentStore();

    const currentUserProgress = ref(null);
    const currentUserProgressDashboard = ref(null);

    async function saveProgress(usersCode: string = "") {
        const progressData = {
            userId: authStore.user?.uid,
            contentId: contentStore.currentContent?._id,
            courseId: contentStore.currentContent?.course._id,
            contentType: contentStore.currentContent?.contentType,
            usersCode,
        };

        const response = await saveProgressService(progressData);
        return response;
    }

    async function fetchCurrentUserProgress() {
        const progress = await getCurrentUserProgress(
            authStore.user.uid,
            contentStore.currentContent.course._id
        );
        currentUserProgress.value = progress;
    }

    async function fetchDashboardProgress() {
        currentUserProgressDashboard.value = await getCurrentUserAllProgress(authStore.user.uid);
    }

    return {
        currentUserProgress,
        currentUserProgressDashboard,
        saveProgress,
        fetchCurrentUserProgress,
        fetchDashboardProgress,
    };
});
