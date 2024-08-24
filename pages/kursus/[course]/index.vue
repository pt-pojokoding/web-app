<script setup>
// TODO :Lazy fetch
// TODO: Fix design accordion
import { renderMarkdown } from "~/services/content/renderMarkdown";

const route = useRoute();
const courseSlug = ref(route.params.course);
const contentStore = useContentStore();

const course = await contentStore.getCourse(courseSlug.value);
const firstContentSlug = course.value.subcourses[0].contents[0].slug.current;
const startLearningButtonLoading = ref(false);

const accordions = course.value.subcourses.map((subcourse, index) => {
    return {
        label: subcourse.title,
        contents: subcourse.contents,
        defaultOpen: index === 0, // Set defaultOpen to true for the first accordion
    };
});

function subCoursePostAndExerciseCount(subcourseContents) {
    const postCount = subcourseContents.filter((content) => content.contentType === "post").length;
    const exerciseCount = subcourseContents.filter((content) => content.contentType === "exercise").length;
    return {
        postCount,
        exerciseCount,
    };
}

useSeoMeta({
    title: course.value.title,
    ogTitle: course.value.title,
});
</script>

<template>
    <div class="px-20 py-8 space-y-4 min-h-screen flex gap-6 text-black dark:text-white">
        <div class="w-8/12 space-y-3 article">
            <!-- $ Short Description -->
            <h1 class="text-6xl" data-cy="course-detail-title">{{ course.title }}</h1>
            <div class="space-y-2" data-cy="course-detail-shortDescription">
                <p>{{ course.shortDescription }}</p>
            </div>

            <UDivider class="dark:*:border-slate-700" />

            <!-- $ Course Description -->
            <div class="space-y-2">
                <div v-html="renderMarkdown(course.description)" data-cy="course-detail-description"></div>
            </div>

            <!-- $ Prerequisites -->
            <div class="">
                <h2 class="font-semibold text-2xl" data-cy="course-detail-prerequisites-title">
                    <Icon name="i-heroicons-clipboard-document-check" class="text-primary text-2xl" />
                    Prasyarat
                </h2>
                <div v-html="renderMarkdown(course.prerequisites)" data-cy="course-detail-prerequisites-description"></div>
            </div>
            <div class="">
                <h2 class="font-semibold text-2xl" data-cy="course-detail-learning-scope-title">
                    <Icon name="i-heroicons-cube" class="text-primary text-2xl" /> Ruang lingkup pembelajaran
                </h2>
                <div v-html="renderMarkdown(course.learningScope)" data-cy="course-detail-learning-scope-description"></div>
            </div>

            <div>
                <h2 class="font-semibold text-2xl" data-cy="course-detail-learning-objective-title">
                    <Icon name="i-heroicons-book-open" class="text-primary text-2xl" />
                    Yang akan anda pelajari
                </h2>
                <div v-html="renderMarkdown(course.learningObjectives)" data-cy="course-detail-learning-objective-description"></div>
            </div>

            <!-- $ Accordion -->
            <div>
                <h2 class="text-2xl font-semibold mb-2" data-cy="course-detail-material-title">Materi Kursus</h2>
                <UAccordion multiple :items="accordions" color="white" variant="solid" size="xl">
                    <template #default="{ item, open }">
                        <div
                            class="py-2 px-4 border border-slate-600 rounded mb-2 flex items-center justify-between"
                            data-cy="course-detail-material-accordion-button"
                        >
                            <h3 class="text-lg" data-cy="course-detail-material-accordion-title">
                                {{ item.label }}
                            </h3>
                            <div class="flex items-center gap-4">
                                <p
                                    class="text-sm"
                                    v-if="
                                        subCoursePostAndExerciseCount(item.contents).exerciseCount > 0 ||
                                        subCoursePostAndExerciseCount(item.contents).postCount > 0
                                    "
                                >
                                    <span v-if="subCoursePostAndExerciseCount(item.contents).exerciseCount > 0">
                                        {{ subCoursePostAndExerciseCount(item.contents).exerciseCount }} Latihan
                                    </span>
                                    <span v-if="subCoursePostAndExerciseCount(item.contents).exerciseCount > 0 && subCoursePostAndExerciseCount(item.contents).postCount > 0">
                                        &middot;
                                    </span>
                                    <span v-if="subCoursePostAndExerciseCount(item.contents).postCount > 0">
                                        {{ subCoursePostAndExerciseCount(item.contents).postCount }} Artikel
                                    </span>
                                </p>
                                <UIcon
                                    name="i-heroicons-chevron-right-20-solid"
                                    class="w-5 h-5 ms-auto transform transition-transform duration-200"
                                    :class="[open && 'rotate-90']"
                                />
                            </div>
                        </div>
                    </template>

                    <template #item="{ item }">
                        <div class="space-y-2 mb-2 rounded">
                            <div v-for="(content, index) in item.contents" :key="index">
                                <NuxtLink :to="`/kursus/${courseSlug}/${content.slug.current}`" data-cy="course-detail-material-accordion-item-link">
                                    <div class="rounded w-full p-2 text-[16px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-800">
                                        <div class="flex items-center gap-4">
                                            <UIcon
                                                v-if="content.contentType === 'exercise'"
                                                class="text-[18px] col-span-1"
                                                name="i-heroicons-code-bracket-square"
                                                data-cy="course-detail-material-accordion-content-not-completed-button-locked-icon"
                                            ></UIcon>
                                            <UIcon
                                                v-if="content.contentType === 'post'"
                                                class="text-[18px] col-span-1"
                                                name="i-heroicons-document-text"
                                                data-cy="course-detail-material-accordion-sidebar-content-not-completed-button-unlocked-icon"
                                            ></UIcon>
                                            <p class="text-black dark:text-white" data-cy="course-detail-material-accordion-item-link-text">
                                                {{ content.displayTitle }}
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
            <img :src="course.image" class="aspect-video w-full bg-orange-400 rounded-md" data-cy="course-detail-image" />
            <div class="">
                <!-- <UBadge size="md" class="uppercase">{{ course.difficulty }}</UBadge> -->
                <!-- <UBadge class="ml-auto">Harga: Rp. {{ course.price }}</UBadge> -->
            </div>
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
