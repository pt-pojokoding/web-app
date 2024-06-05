// @ts-nocheck
import { saveProgressService } from "~/services/progress/saveProgress";
import { getCurrentUserProgress } from "~/services/progress/getCurrentUserProgress";
import { getCurrentUserAllProgress } from "~/services/progress/getCurrentUserAllProgress";

export const useProgressStore = defineStore("progress", () => {
    const router = useRouter();
    const authStore = useAuthStore();
    const contentStore = useContentStore();

    const currentUserProgress = ref<any>(null);
    const currentUserProgressDashboard = ref<any>(null);
    const currentContentProgress = ref<any>(null);

    function getCurrentContentProgress(currentContentId: string){
        return currentUserProgress.value?.find((progress) => progress.contentId === currentContentId);
    }

    async function saveProgress(usersCode: string = "") {
        const progressData = {
            userId: authStore.user?.uid,
            contentId: contentStore.currentContent?._id,
            courseId: contentStore.currentContent?.course._id,
            contentType: contentStore.currentContent?.contentType,
            courseSlug: contentStore.currentContent?.course.slug.current,
            contentSlug: contentStore.currentContent?.slug.current,
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
                courseId || contentStore.currentContent.course._id
            );
            currentUserProgress.value = progress;
        }
    }

    async function fetchDashboardProgress() {
        currentUserProgressDashboard.value = await getCurrentUserAllProgress(authStore.user.uid);
    }

    async function continueLearning(courseId: string) {
        await fetchCurrentUserProgress(courseId);
        console.log(currentUserProgress.value)
        const latestProgressContentSlug = currentUserProgress.value[currentUserProgress.value.length - 1].contentSlug;
        const latestProgressCourseSlug = currentUserProgress.value[currentUserProgress.value.length - 1].courseSlug;
        router.push(`/kursus/${latestProgressCourseSlug}/${latestProgressContentSlug}`);  
    }

    return {
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
