import { useProgressStore } from './progress';
import { useExerciseStore } from './exercise';
import { getContentData } from '~/services/content/content';
import { renderMarkdown } from '~/services/content/renderMarkdown';
import { getAllCourses } from '~/services/content/courses';
import { getOneCourse } from '~/services/content/course';
import { getSidebarData } from '~/services/content/sidebar';

export const useContentStore = defineStore('content', () => {
    const progressStore = useProgressStore();
    const exerciseStore = useExerciseStore();

    const courseCatalog = ref<any>([]);
    const currentContent = ref<any>(null);
    const sidebar = ref<any>([]);
    const currentCourseSlug = ref<string>('');

    const code = ref('');
    const renderedPrompt = ref(renderMarkdown(currentContent.value?.body.find((item: any) => item.type === "question")?.value ?? ""));

    const testCases = ref([]);

    watch(currentContent, (newContent) => {
        // console.log("new Content", newContent?.body.find((item: any) => item.type === "test_cases")?.value)
        if(newContent.content_type === "exercise"){
            code.value = newContent?.body.find((item: any) => item.type === "starting_code").value ?? "";
            renderedPrompt.value = renderMarkdown(newContent?.body.find((item: any) => item.type === "question")?.value ?? "");
        }

        const testCasesData = newContent?.body.find((item: any) => item.type === "test_cases")?.value;
        if (testCasesData) {
            testCases.value = testCasesData.map((test: any) => ({
                ...test,
                test_description: renderMarkdown(test.test_description),
                defaultOpen: false,
            }));
        } else {
            testCases.value = [];
        }
    });

    function isCurrentContentFinished() {
        if (!progressStore.currentUserProgress) return false;
        return progressStore.currentUserProgress.some((progress: any) => progress.contentId === currentContent.value?._id);
    }

    async function getCourses() {
        if (courseCatalog.value.length <= 0) {
            try {
                courseCatalog.value = await getAllCourses();
            } catch (e) {
                console.error(e);
            }
        }
    }

    async function getCourse(slug: string) {
        const courseObject = await getOneCourse(slug);
        if (!courseObject) {
            console.error("Course not found.");
            return null;
        }

        return courseObject;
    }

    async function getContent(contentSlug: string) {
        const content = await getContentData(contentSlug);
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
            console.log("current user progress")
            console.log("sidebar value", sidebar.value)
            for (const section of sidebar.value) {
                console.log("section", section.contents)
                for (const content of section.contents) {
                    if (progressStore.currentUserProgress.some((progress: any) => progress.contentId === content.id)) {
                        content.isContentCompleted = true;
                    }
                }
            }
        }
    }

    function resetCode() {
        if (currentContent.value) {
            code.value = currentContent.value.body.find((item: any) => item.type === "starting_code").value;
            console.log("reset code");
            console.log("Starting code", currentContent.value.body.find((item: any) => item.type === "starting_code").value);
        } else {
            console.log("No current content to reset code from");
        }
    }

    return {
        courseCatalog,
        currentContent,
        sidebar,
        code,
        renderedPrompt,
        testCases,
        currentCourseSlug,
        isCurrentContentFinished,
        getCourses,
        getCourse,
        getContent,
        getSidebar,
        populateSidebarWithUserProgress,
        resetCode
    };
});
