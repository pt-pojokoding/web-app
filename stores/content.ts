// @ts-nocheck
import { getAllCourses } from "~/services/content/courses";
import { getOneCourse } from "~/services/content/course";
import { getContentData } from "~/services/content/content";
import { getSidebarData } from "~/services/content/sidebar";

export const useContentStore = defineStore("content", () => {
    const progressStore = useProgressStore();

    const courseCatalog = ref<any>([]);
    const currentContent = ref<any>(null);
    const sidebar = ref<any>([]);
    const currentCourseSlug = ref<string>("");

    function isCurrentContentFinished() {
        if(!progressStore.currentUserProgress) return false;
        return progressStore.currentUserProgress.some(
            (progress) => progress.contentId === currentContent.value._id
        );
    }

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
            console.log(courseSlug)
            currentCourseSlug.value = courseSlug;
            const sidebarData = await getSidebarData(courseSlug);
            sidebar.value = sidebarData;
        }
    }

    async function populateSidebarWithUserProgress() {
        /**
         * Cari konten pada sidebar yang terdapat pada currentUserProgress
         * jika konten tersebut ada di kedua tempat, maka tambah properti isContentFinished = true
         * isContentFinished digunakan untuk menampilkan tanda centang pada item tersebut
         */
        if (progressStore.currentUserProgress) {
            for (const section of sidebar.value) {
                for (const content of section.contents) {
                    if (progressStore.currentUserProgress.some((progress) => progress.contentId === content._id)) {
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
        isCurrentContentFinished,
        getCourses,
        getCourse,
        getContent,
        getSidebar,
        populateSidebarWithUserProgress,
    };
});
