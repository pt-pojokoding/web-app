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

const accordions = course.value.subcourses.map((subcourse) => {
    return {
        label: subcourse.title,
        contents: subcourse.contents,
    };
});
</script>

<template>
    <div class="px-20 py-8 space-y-4 min-h-screen flex gap-6 text-black dark:text-white">
        <div class="w-8/12 space-y-3 article">
            <!-- $ Short Description -->
            <h1 class="text-6xl">{{ course.title }}</h1>
            <div class="space-y-2">
                <p>{{ course.shortDescription }}</p>
            </div>

            <UDivider class="dark:*:border-slate-700" />

            <!-- $ Course Description -->
            <div class="space-y-2">
                <div v-html="renderMarkdown(course.description)"></div>
            </div>

            <!-- $ Prerequisites -->
            <div class="">
                <h2 class="font-semibold text-2xl">
                    <Icon
                        name="i-heroicons-clipboard-document-check"
                        class="text-primary text-2xl"
                    />
                    Prasyarat
                </h2>
                <div v-html="renderMarkdown(course.prerequisites)"></div>
            </div>
            <div class="">
                <h2 class="font-semibold text-2xl">
                    <Icon name="i-heroicons-cube" class="text-primary text-2xl" /> Ruang lingkup
                    pembelajaran
                </h2>
                <div v-html="renderMarkdown(course.learningScope)"></div>
            </div>

            <div>
                <h2 class="font-semibold text-2xl">
                    <Icon name="i-heroicons-book-open" class="text-primary text-2xl" />
                    Yang akan anda pelajari
                </h2>
                <div v-html="renderMarkdown(course.learningObjectives)"></div>
            </div>

            <!-- $ Accordion -->
            <div>
                <h2 class="text-2xl font-semibold mb-2">Materi Kursus</h2>
                <UAccordion multiple :items="accordions" color="white" variant="solid" size="xl">
                    <template #item="{ item }">
                        <div class="space-y-1 mb-2 dark:bg-slate-800 rounded">
                            <div v-for="(content, index) in item.contents" :key="index">
                                <NuxtLink :to="`/kursus/${courseSlug}/${content.slug.current}`">
                                    <div
                                        class="w-full p-2 text-[16px] dark:text-white dark:hover:bg-slate-700 hover:bg-slate-100"
                                    >
                                        <p class="text-black dark:text-white">{{ content.displayTitle }}</p>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                    </template>
                </UAccordion>
            </div>
        </div>

        <!-- $ Sticky Side Card -->
        <div
            class="w-4/12 space-y-3 px-3 py-2 bg-slate-200 dark:bg-white/5 rounded-lg h-fit sticky top-32"
        >
            <img :src="course.image" class="aspect-video w-full bg-orange-400 rounded-md" />
            <div class="">
                <UBadge size="md" class="uppercase">{{ course.difficulty }}</UBadge>
                <!-- <UBadge class="ml-auto">Harga: Rp. {{ course.price }}</UBadge> -->
            </div>
            <NuxtLink :to="`/kursus/${courseSlug}/${firstContentSlug}`" class="block">
                <UButton
                    class="w-full flex items-center justify-center"
                    :loading="startLearningButtonLoading"
                    @click="startLearningButtonLoading = true"
                    >Mulai Belajar</UButton
                >
            </NuxtLink>
        </div>
    </div>
</template>
