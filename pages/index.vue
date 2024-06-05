<script setup>
const contentStore = useContentStore();  
const courses = await contentStore.getCourses();

function handleScrollToCoursesList() {
    const el = document.getElementById('daftar-kursus');
    el.scrollIntoView({ behavior: 'smooth' });
}

</script>

<template>
    <div class="flex flex-col gap-12 py-8">
        <!-- Header -->
        <div class="h-[calc(70vh-3rem)] flex flex-col items-center justify-center pb-10 space-y-6  px-24">
            <h1 class="text-7xl font-semibold text-center font-space-mono">Selamat Datang di <br> <span class="text-primary font-bold">Pojokoding</span></h1>
            <p class="text-xl">Belajar tentang pengrograman tanpa mengeluarkan uang sepeser pun. Daftar sekarang!</p>
            <UButton @click="handleScrollToCoursesList" variant="grey" size="xl" class="p-0 hover:bg-transparent border-2 border-gray-500">
                <div class="flex flex-col justify-center items-center gap-2 transition-all duration-200 ease-in-out hover:gap-4 p-4 hover:bg-transparent rounded">
                    <span>Lihat Daftar Kursus</span>
                    <UIcon name="i-heroicons-chevron-down"/>
                </div>
            </UButton>
        </div>
        <!-- -- -->

        <!-- List of Courses -->
        <div id="daftar-kursus" class="pt-10 pb-32 px-24">
            <h2 class="text-4xl mb-4">Daftar Kursus</h2>
            <div class="grid grid-cols-3 gap-8">
                <ContentCourseCatalog></ContentCourseCatalog>
            </div>
        </div>
        <!-- -- -->

        <!-- BELUM SIAP -->
        <!-- Testimonials Carousel -->
        <!-- <div class="w-[700px] aspect-[12/8] mx-auto p-20">
            <h2 class="text-4xl mb-8 text-center">Testimoni dari alumni kursus</h2>
            <TestimonialsCarousel></TestimonialsCarousel>
        </div> -->
        <!-- -- -->

    </div>
</template>
