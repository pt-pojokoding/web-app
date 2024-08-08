<script setup>
/**
 * Menampilkan daftar card yang berisikan data kursus,
 * tidak memiliki style di bagian container
 */
const contentStore = useContentStore();
await contentStore.getCourses();
const courses = contentStore.courseCatalog;
</script>

<template>
    <div v-for="course in courses" :key="course._id" :data-cy="'course-catalog-' + course._id">
        <NuxtLink :to="`/kursus/${course.slug.current}`" :data-cy="'course-catalog-link-' + course._id">
            <div class="border-2 border-gray-500 dark:bg-slate-800 bg-slate-100 rounded h-full" :data-cy="'course-catalog-' + course._id + '-container'">
                <img
                    :src="course.mainImage"
                    alt="Course Cover"
                    class="w-full h-52 object-cover"
                    :data-cy="'course-catalog-' + course._id + '-image'"
                />
                <div class="p-4" :data-cy="'course-catalog-' + course._id + '-content'">
                    <h2 class="text-2xl font-bold" :data-cy="'course-catalog-' + course._id + '-title'">{{ course.title }}</h2>
                    <p :data-cy="'course-catalog-' + course._id + '-description'">{{ course.shortDescription }}</p>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>
