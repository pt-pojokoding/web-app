<script setup>
const props = defineProps({
    courseSlug: {
        type: String,
    },
});

const route = useRoute();
const authStore = useAuthStore();
const contentStore = useContentStore();
const progressStore = useProgressStore();

await contentStore.getSidebar(props.courseSlug || route.params.course);
await progressStore.fetchCurrentUserProgress();
await contentStore.populateSidebarWithUserProgress();

const courseSlug = props.courseSlug || route.params.course;

function userIsNotLoggedInAndContentIsExercise(content) {
    return !authStore.user && content.contentType === "exercise";
}

function isContentExercise(content){
    return content.contentType === "exercise";
} 
</script>

<template>
    <div class="flex flex-col gap-3" data-cy="sidebar">
        <template v-for="(subcourse, index) in contentStore.sidebar" :key="index">
            <span class="text-md font-bold border-b border-gray-700 pb-2" data-cy="sidebar-subcourse-title">{{ subcourse.title }}</span>
            <template v-for="(content, index) in subcourse.contents" :key="index">
                <NuxtLink :to="`/kursus/${courseSlug}/${content.slug.current}`" :data-cy="`sidebar-content-link-${content._id}`">
                    <!-- Only when content is completed  -->
                    <UButton
                        v-if="content.isContentCompleted"
                        variant="ghost"
                        class="w-full text-start text-primary text-base grid grid-cols-12"
                        data-cy="sidebar-content-completed-button"
                    >
                        <UIcon
                            name="i-heroicons-check-circle"
                            class="text-[18px] col-span-1"
                            data-cy="sidebar-content-completed-icon"
                        ></UIcon>
                        <span class="col-span-11 ml-2" data-cy="sidebar-content-title">{{ content.displayTitle }}</span>
                    </UButton>

                    <!-- if content is not completed and if user is not logged in and content type is exercise -->
                    <UButton
                        v-else
                        :disabled="userIsNotLoggedInAndContentIsExercise(content)"
                        variant="ghost"
                        class="w-full text-start dark:text-white text-black text-base grid grid-cols-12"
                        data-cy="sidebar-content-not-completed-button"
                    >
                        <UIcon
                            v-if="isContentExercise(content)"
                            class="text-[18px] col-span-1"
                            name="i-heroicons-code-bracket-square"
                            data-cy="sidebar-content-not-completed-button-locked-icon"
                        ></UIcon>
                        <UIcon
                            v-else
                            class="text-[18px] col-span-1"
                            name="i-heroicons-document-text"
                            data-cy="sidebar-content-not-completed-button-unlocked-icon"
                        ></UIcon>

                        <span class="col-span-11 ml-2" data-cy="sidebar-content-not-completed-button-title">{{ content.displayTitle }}</span>
                    </UButton>
                </NuxtLink>
            </template>
        </template>
    </div>
</template>
