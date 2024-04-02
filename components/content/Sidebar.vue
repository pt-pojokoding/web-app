<script setup>
const route = useRoute();
const courseSlug = route.params.course;

const useContent = useContentStore();

const sidebarData = useContent.sidebar;
</script>

<template>
    <aside
        class="lg:w-[250px] p-4 border-r-2 h-screen-minus-navbar overflow-auto sidebar-sticky bg-white dark:bg-slate-950"
    >
        <div class="flex flex-col gap-3">
            <template v-for="(subcourse, index) in sidebarData" :key="index">
                <span class="text-md font-bold border-b border-gray-700 pb-2">{{
                    subcourse.title
                }}</span>
                <template v-for="(content, index) in subcourse.contents" :key="index">
                    <NuxtLink :to="`/kursus/${courseSlug}/${content.slug.current}`">
                        <UButton
                            v-if="content.isContentCompleted"
                            icon="i-heroicons-check-circle"
                            variant="ghost"
                            class="w-full text-start text-primary"
                            >{{ content.displayTitle }}</UButton
                        >   
                        <UButton
                            v-else
                            variant="ghost"
                            class="w-full text-start dark:text-white text-black"
                            >{{ content.displayTitle }}</UButton
                        >
                    </NuxtLink>
                </template>
            </template>
        </div>
    </aside>
</template>

<style scoped>
.sidebar-sticky {
    position: sticky;
    top: var(--navbar-height);
}
</style>
