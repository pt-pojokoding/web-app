<script setup>
const contentStore = useContentStore();  
const courses = await contentStore.getCourses();
</script>

<template>
    <div class="flex flex-col gap-12 py-8">
        <div class="h-[calc(100vh-3rem)] flex flex-col items-center justify-center pb-10 space-y-6  px-24">
            <h1 class="text-7xl font-semibold text-center">Selamat Datang di <br> <span class="text-primary font-bold">Pojokoding</span></h1>
            <p class="text-xl">Belajar tentang pengrograman tanpa mengeluarkan uang sepeser pun. Daftar sekarang!</p>
            <UButton to="/register" color="primary">Daftar Sekarang!</UButton>
        </div>

        <!-- List of Courses -->
        <div class="py-20  px-24">
            <h2 class="text-4xl mb-4">Rekomendasi untukmu </h2>
            <div class="grid grid-cols-3 gap-8">
                <ContentCourseCatalog></ContentCourseCatalog>
            </div>
        </div>
        <!-- -- -->

        <!-- Testimonials Carousel -->
        <div class="w-[700px] aspect-[12/8] mx-auto p-20">
            <h2 class="text-4xl mb-8 text-center">Testimoni dari alumni kursus</h2>
            <TestimonialsCarousel></TestimonialsCarousel>
        </div>
        <!-- -- -->

    </div>
</template>
