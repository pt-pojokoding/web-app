<script setup>
const props = defineProps({
    courseSlug: {
        type: String,
    },
    courseId: {
        type: String
    }
});

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const contentStore = useContentStore();
const progressStore = useProgressStore();

await contentStore.getSidebar(props.courseSlug || route.params.course);
await progressStore.fetchCurrentUserProgress(props.courseId);
await contentStore.populateSidebarWithUserProgress();

const courseSlug = props.courseSlug || route.params.course;
const sidebarRef = ref(null);

// to disable non logged in user to access app
function userIsNotLoggedInAndContentIsExercise(content) {
    return !authStore.user && content.contentType === "exercise";
}

function isContentExercise(content) {
    return content.contentType === "exercise";
}

const scrollToActiveLink = async () => {
    await nextTick();
    const activeLink = sidebarRef.value.querySelector('.router-link-active');
    if (activeLink) {
        activeLink.scrollIntoView({ behavior: 'smooth' });
    }
};

onMounted(() => {
    scrollToActiveLink();
})

</script>

<template>
    <div ref="sidebarRef" class="flex flex-col gap-3" data-cy="sidebar">
        <template v-for="(subcourse, index) in contentStore.sidebar" :key="index">
            <span class="text-md font-bold border-b border-gray-700 pb-2" data-cy="sidebar-subcourse-title">{{
                subcourse.title }}</span>
            <template v-for="(content, index) in subcourse.contents" :key="index">
                <NuxtLink :to="`/kursus/${courseSlug}/${content.slug}`" :data-cy="`sidebar-content-link-${content.id}`">
                    <!-- if content is completed -->
                    <UButton v-if="content.isContentCompleted" variant="ghost"
                        class="w-full text-start text-primary text-base grid grid-cols-12 justify-between"
                        data-cy="sidebar-content-completed-button">
                        <UIcon
                            :name="isContentExercise(content) ? 'i-heroicons-code-bracket-square' : 'i-heroicons-document-text'"
                            class="text-[18px] col-span-1" data-cy="sidebar-content-type-icon"></UIcon>
                        <span class="col-span-10 ml-2" data-cy="sidebar-content-title">{{ content.title }}</span>
                        <UIcon name="i-heroicons-check-circle" class="text-[18px] col-span-1"
                            data-cy="sidebar-content-completed-icon"></UIcon>
                    </UButton>

                    <!-- if content is not completed show this button -->
                    <!-- if user is not logged in and content type is exercise lock the button -->
                    <UButton v-else :disabled="userIsNotLoggedInAndContentIsExercise(content)" variant="ghost"
                        class="w-full text-start dark:text-white text-black text-base grid grid-cols-12"
                        data-cy="sidebar-content-not-completed-button">
                        <UIcon v-if="isContentExercise(content)" class="text-[18px] col-span-1"
                            name="i-heroicons-code-bracket-square"
                            data-cy="sidebar-content-not-completed-button-locked-icon"></UIcon>
                        <UIcon v-else class="text-[18px] col-span-1" name="i-heroicons-document-text"
                            data-cy="sidebar-content-not-completed-button-unlocked-icon"></UIcon>

                        <span class="col-span-11 ml-2" data-cy="sidebar-content-not-completed-button-title">{{
                            content.title }}</span>
                    </UButton>
                </NuxtLink>
            </template>
        </template>
    </div>
</template>

<style lang="postcss" scoped>
.router-link-active {
    @apply bg-primary bg-opacity-50 rounded-lg;
}
</style>