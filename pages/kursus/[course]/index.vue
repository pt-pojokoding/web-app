<script setup>
// TODO :Lazy fetch
// TODO: Fix design accordion
import { renderMarkdown } from "~/services/content/renderMarkdown";

const route = useRoute();
const courseSlug = ref(route.params.course);
const contentStore = useContentStore();

const course = await contentStore.getCourse(courseSlug.value);
const firstContentSlug = course.subcourses[0].contents[0].slug;
const startLearningButtonLoading = ref(false);

const accordions = computed(() => {
    return course.subcourses.map((subcourse, index) => {
        const { postCount, exerciseCount } = subCoursePostAndExerciseCount(subcourse.contents);
        return {
            label: subcourse.title,
            contents: subcourse.contents,
            postCount,
            exerciseCount,
            defaultOpen: index === 0,
            open: index === 0
        };
    });
});

function subCoursePostAndExerciseCount(subcourseContents) {
    const postCount = subcourseContents.filter((content) => content.content_type === "article").length;
    const exerciseCount = subcourseContents.filter((content) => content.content_type === "exercise").length;
    return {
        postCount,
        exerciseCount,
    };
}

useSeoMeta({
    title: course.title,
    ogTitle: course.title,
});
</script>

<template>
    <div class="px-20 py-8 space-y-4 min-h-screen flex gap-6 text-black dark:text-white">
        <div class="w-8/12 space-y-3 article">
            <!-- Short Description -->
            <h1 class="text-6xl" data-cy="course-detail-title">{{ course.title }}</h1>
            <div class="space-y-2" data-cy="course-detail-shortDescription">
                <p>{{ course.short_description }}</p>
            </div>

            <UDivider class="dark:*:border-slate-700" />

            <!-- Course Description -->
            <div class="space-y-2">
                <div v-html="renderMarkdown(course.description)" data-cy="course-detail-description"
                    class="markdown-style"></div>
            </div>

            <!-- Accordion -->
            <div>
                <h2 class="text-2xl font-semibold mb-2" data-cy="course-detail-material-title">Materi Kursus</h2>
                <UAccordion multiple :items="accordions" color="white" variant="solid" size="xl">
                    <template #default="{ item, open }">
                        <div class="py-2 px-4 border border-slate-600 rounded mb-2 flex items-center justify-between cursor-pointer"
                            data-cy="course-detail-material-accordion-button">
                            <h3 class="text-lg" data-cy="course-detail-material-accordion-title">
                                {{ item.label }}
                            </h3>
                            <div class="flex items-center gap-4">
                                <p class="text-sm" v-if="item.postCount > 0 || item.exerciseCount > 0">
                                    <span v-if="item.exerciseCount > 0">
                                        {{ item.exerciseCount }} Latihan
                                    </span>
                                    <span v-if="item.exerciseCount > 0 && item.postCount > 0">
                                        &middot;
                                    </span>
                                    <span v-if="item.postCount > 0">
                                        {{ item.postCount }} Artikel
                                    </span>
                                </p>
                                <UIcon name="i-heroicons-chevron-right-20-solid"
                                    class="w-5 h-5 ms-auto transform transition-transform duration-200"
                                    :class="[open && 'rotate-90']" />
                            </div>
                        </div>
                    </template>

                    <template #item="{ item }">
                        <div class="space-y-2 mb-2 rounded">
                            <div v-for="(content, index) in item.contents" :key="index">
                                <NuxtLink :to="`/kursus/${courseSlug}/${content.slug}`"
                                    data-cy="course-detail-material-accordion-item-link">
                                    <div
                                        class="rounded w-full p-2 text-[16px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-800">
                                        <div class="flex items-center gap-4">
                                            <UIcon v-if="content.content_type === 'exercise'"
                                                class="text-[18px] col-span-1" name="i-heroicons-code-bracket-square"
                                                data-cy="course-detail-material-accordion-content-not-completed-button-locked-icon">
                                            </UIcon>
                                            <UIcon v-if="content.content_type === 'article'"
                                                class="text-[18px] col-span-1" name="i-heroicons-document-text"
                                                data-cy="course-detail-material-accordion-sidebar-content-not-completed-button-unlocked-icon">
                                            </UIcon>
                                            <p class="text-black dark:text-white"
                                                data-cy="course-detail-material-accordion-item-link-text">
                                                {{ content.title }}
                                            </p>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                    </template>
                </UAccordion>
            </div>
        </div>

        <!-- $ Sticky Side Card -->
        <div class="w-4/12 space-y-3 px-3 py-2 bg-slate-200 dark:bg-white/5 rounded-lg h-fit sticky top-32">
            <img :src="course.cover_image" class="aspect-video w-full bg-orange-400 rounded-md" data-cy="course-detail-image" />

            <NuxtLink :to="`/kursus/${courseSlug}/${firstContentSlug}`" class="block">
                <UButton    
                    class="w-full flex items-center justify-center"
                    :loading="startLearningButtonLoading"
                    @click="startLearningButtonLoading = true"
                    data-cy="course-detail-start-learning-button"
                    >Mulai Belajar</UButton
                >
            </NuxtLink>
        </div>
    </div>
</template>
