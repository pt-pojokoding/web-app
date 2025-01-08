// @ts-nocheck
import { saveProgressService } from "~/services/progress/saveProgress";
import { getCurrentUserProgress } from "~/services/progress/getCurrentUserProgress";
import { getCurrentUserAllProgress } from "~/services/progress/getCurrentUserAllProgress";

export const useProgressStore = defineStore("progress", () => {
    const router = useRouter();
    const authStore = useAuthStore();
    const contentStore = useContentStore();

    const isContinueLearningButtonLoading = ref(false)
    const currentUserProgress = ref<any>(null);
    const currentUserProgressDashboard = ref<any>(null);
    const currentContentProgress = ref<boolean>(null);

    function getCurrentContentProgress(currentContentId: string){
        return currentUserProgress.value?.find((progress) => progress.contentId === currentContentId);
    }

    async function saveProgress(usersCode: string = "") {
        const progressData = {
            userId: authStore.user?.uid,
            contentId: contentStore.currentContent?.id,
            courseId: contentStore.currentContent?.course_id,
            contentType: contentStore.currentContent?.content_type,
            courseSlug: contentStore.currentCourseSlug,
            contentSlug: contentStore.currentContent?.slug,
            usersCode,
        };

        const response = await saveProgressService(progressData);
        currentUserProgress.value.push(response);
        console.log(response)
        return response
    }

    async function fetchCurrentUserProgress(courseId: string = "") {
        if(authStore.user){
            const progress = await getCurrentUserProgress(
                authStore.user.uid,
                courseId || contentStore.currentContent.course_id
            );
            currentUserProgress.value = progress;
        }
    }

    async function fetchDashboardProgress() {
        currentUserProgressDashboard.value = await getCurrentUserAllProgress(authStore.user.uid);
    }

    async function continueLearning(courseId: string) {
        isContinueLearningButtonLoading.value = true
        await fetchCurrentUserProgress(courseId);
        const latestProgressContentSlug = currentUserProgress.value[currentUserProgress.value.length - 1].contentSlug;
        const latestProgressCourseSlug = currentUserProgress.value[currentUserProgress.value.length - 1].courseSlug;        
        await router.push(`/kursus/${latestProgressCourseSlug}/${latestProgressContentSlug}`);  
        isContinueLearningButtonLoading.value = false
    }

    return {
        isContinueLearningButtonLoading,
        currentUserProgress,
        currentUserProgressDashboard,
        saveProgress,
        fetchCurrentUserProgress,
        fetchDashboardProgress,
        currentContentProgress,
        getCurrentContentProgress,
        continueLearning,
    };
});
