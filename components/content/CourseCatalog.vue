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
    <div v-for="course in courses" :key="course._id">
        <NuxtLink :to="`/kursus/${course.slug.current}`">
            <div class="border-2 border-gray-500 rounded">
                <img
                    :src="course.mainImage"
                    alt="Course Cover"
                    class="w-full h-52 object-cover"
                />
                <UCard>
                    <h2 class="text-2xl font-bold">{{ course.title }}</h2>
                    <p>{{ course.shortDescription }}</p>
                </UCard>
            </div>
        </NuxtLink>
    </div>
</template>
