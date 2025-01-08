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
  <div>
    <div v-for="(course, index) in courses" :key="course._id" :data-cy="'course-catalog-' + course._id">
      <NuxtLink :to="`/kursus/${course.slug}`">
        <UCard class="p-0">
          <img :src="course.cover_image" :alt="course.title">
          <h2>{{ course.title }}</h2>
          <p>{{ course.short_description }}</p>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
