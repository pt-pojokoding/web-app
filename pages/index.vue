<script setup>
const contentStore = useContentStore();  
const courses = await contentStore.getCourses();
</script>

<template>
    <div class="flex flex-col gap-12 py-8">
        <h1 class="text-9xl">Pojokoding.</h1>

        <!-- List of Courses -->
        <div class="grid grid-cols-3 gap-8">
            <ContentCourseCatalog></ContentCourseCatalog>
        </div>
        <!-- -- -->

        <!-- Testimonials Carousel -->
        <div class="w-[700px] h-[700px] mx-auto bg-purple-500 p-20">
            <TestimonialsCarousel></TestimonialsCarousel>
        </div>
        <!-- -- -->

    </div>
</template>
