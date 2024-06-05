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

console.log(props.courseSlug);
console.log(route.params.course);

await contentStore.getSidebar(props.courseSlug || route.params.course);
await progressStore.fetchCurrentUserProgress();
await contentStore.populateSidebarWithUserProgress();

const courseSlug = props.courseSlug || route.params.course;

function userIsNotLoggedInAndContentIsExercise(content) {
    return !authStore.user && content.contentType === "exercise";
}
</script>

<template>
    <div class="flex flex-col gap-3" data-cy="sidebar">
        <template v-for="(subcourse, index) in contentStore.sidebar" :key="index">
            <span class="text-md font-bold border-b border-gray-700 pb-2" data-cy="sidebar-subcourse-title">{{ subcourse.title }}</span>
            <template v-for="(content, index) in subcourse.contents" :key="index">
                <NuxtLink :to="`/kursus/${courseSlug}/${content.slug.current}`" data-cy="sidebar-content-link">
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
                    <UButton
                        v-else
                        :disabled="userIsNotLoggedInAndContentIsExercise(content)"
                        variant="ghost"
                        class="w-full text-start dark:text-white text-black text-base grid grid-cols-12"
                        data-cy="sidebar-content-pending-button"
                    >
                        <UIcon
                            v-if="userIsNotLoggedInAndContentIsExercise(content)"
                            class="text-[18px] col-span-1"
                            name="i-heroicons-lock-closed"
                            data-cy="sidebar-content-locked-icon"
                        ></UIcon>
                        <span class="col-span-11 ml-2" data-cy="sidebar-content-title">{{ content.displayTitle }}</span>
                    </UButton>
                </NuxtLink>
            </template>
        </template>
    </div>
</template>
