// @ts-nocheck
import { getAllCourses } from "~/services/content/courses";
import { getOneCourse } from "~/services/content/course";
import { getContentData } from "~/services/content/content";
import { getSidebarData } from "~/services/content/sidebar";

export const useContentStore = defineStore("content", () => {
    const progressStore = useProgressStore();

    const courseCatalog = ref([]);
    const currentContent = ref(null);
    const currentContentProgress = ref(null);
    const sidebar = ref([]);
    const currentCourseSlug = ref<string>("");

    async function getCourses() {
        if(courseCatalog.value.length <= 0) {
            courseCatalog.value = await getAllCourses();
        }
    }

    async function getCourse(slug: string) {
        const course = await getOneCourse(slug);
        return course;
    }

    async function getContent(contentSlug: string, courseSlug: string) {
        console.log("getting  content");
        const content = await getContentData(contentSlug, courseSlug);
        currentContent.value = content;
    }

    async function getSidebar(courseSlug: string) {
        if (!(courseSlug === currentCourseSlug.value) && sidebar.value.length <= 0) {
            currentCourseSlug.value = courseSlug;
            const sidebarData = await getSidebarData(courseSlug);
            sidebar.value = sidebarData;
        }
    }

    async function populateSidebarWithUserProgress() {
        const userProgress = progressStore.currentUserProgress;
        console.log("userProgress", userProgress);

        /**
         * Cari konten pada sidebar yang terdapat pada currentUserProgress
         * jika konten tersebut ada di kedua tempat, maka tambah properti isContentFinished = true
         */
        if (userProgress) {
            for (const section of sidebar.value) {
                for (const content of section.contents) {
                    if (userProgress.some((progress) => progress.contentId === content._id)) {
                        content.isContentCompleted = true;
                    }
                }
            }
        }
    }

    return {
        courseCatalog,
        currentContent,
        currentContentProgress,
        sidebar,
        getCourses,
        getCourse,
        getContent,
        getSidebar,
        populateSidebarWithUserProgress,
    };
});
