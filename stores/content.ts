import { getAllCourses } from "~/services/content/courses";
import { getOneCourse } from "~/services/content/course";
import { getContentData } from "~/services/content/content";
import { getSidebarData } from "~/services/content/sidebar";
import { renderMarkdown } from "~/services/content/renderMarkdown";

export const useContentStore = defineStore("content", () => {
    const progressStore = useProgressStore();
    const exerciseStore = useExerciseStore();

    const courseCatalog = ref<any>([]);
    const currentContent = ref<any>(null);
    const sidebar = ref<any>([]);
    const currentCourseSlug = ref<string>("");

    const code = ref(currentContent.value?.startingCode);
    const renderedPrompt = ref(renderMarkdown(currentContent.value?.prompt ?? ""));
    const testCases = ref(currentContent.value?.testCases?.map((test: any) => {
        return {
            ...test,
            testDesc: renderMarkdown(test.testDesc),
            defaultOpen: false,
        };
    }) ?? []);

    watch(currentContent, (newContent) => {
        code.value = newContent?.startingCode ?? "";
        renderedPrompt.value = renderMarkdown(newContent?.prompt ?? "");
        testCases.value = newContent?.testCases?.map((test: any) => {
            return {
                ...test,
                testDesc: renderMarkdown(test.testDesc),
                defaultOpen: false,
            };
        }) ?? [];
    });

    function isCurrentContentFinished() {
        if (!progressStore.currentUserProgress) return false;
        return progressStore.currentUserProgress.some((progress: any) => progress.contentId === currentContent.value._id);
    }

    async function getCourses() {
        if (courseCatalog.value.length <= 0) {
            courseCatalog.value = await getAllCourses();
        }
    }

    async function getCourse(slug: string) {
        const course = await getOneCourse(slug);
        return course;
    }

    async function getContent(contentSlug: string, courseSlug: string) {
        const content = await getContentData(contentSlug, courseSlug);
        currentContent.value = content;
    }

    async function getSidebar(courseSlug: string) {
        if (!(courseSlug === currentCourseSlug.value)) {
            currentCourseSlug.value = courseSlug;
            const sidebarData = await getSidebarData(courseSlug);
            sidebar.value = sidebarData;
        }
    }

    async function populateSidebarWithUserProgress() {
        if (progressStore.currentUserProgress) {
            for (const section of sidebar.value) {
                for (const content of section.contents) {
                    if (progressStore.currentUserProgress.some((progress: any) => progress.contentId === content._id)) {
                        content.isContentCompleted = true;
                    }
                }
            }
        }
    }

    return {
        courseCatalog,
        currentContent,
        sidebar,
        code,
        renderedPrompt,
        testCases,
        isCurrentContentFinished,
        getCourses,
        getCourse,
        getContent,
        getSidebar,
        populateSidebarWithUserProgress,
    };
});
