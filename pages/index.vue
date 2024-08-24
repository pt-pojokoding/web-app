<script setup>
import { NAVBAR_HEIGHT } from '@/constants/navbarHeight';

const contentStore = useContentStore();
const courses = await contentStore.getCourses();

function handleScrollToCoursesList() {
    const el = document.getElementById('daftar-kursus');
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - NAVBAR_HEIGHT;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

useSeoMeta({
    title: 'Pojokoding',
    ogTitle: 'Pojokoding'
})
</script>

<template>
    <div class="flex flex-col gap-12 py-8">
        <!-- Header -->
        <div  class="h-[calc(70vh-3rem)] flex flex-col items-center justify-center pb-10 space-y-6 lg:px-24 px-6">
            <h1 data-cy="header-title" class="lg:text-7xl md:text-5xl text-4xl font-semibold text-center font-space-mono">Selamat Datang di <br> <span class="text-primary font-bold">Pojokoding</span></h1>
            <!-- <p data-cy="header-short-description" class="md:text-lg text-md">Belajar tentang pengrograman tanpa mengeluarkan uang sepeser pun. Daftar sekarang!</p> -->
            <UButton data-cy="header-look-course-list-button" @click="handleScrollToCoursesList" variant="grey" size="xl" class="p-0 hover:bg-transparent border-2 border-gray-500">
                <div class="flex flex-col justify-center items-center gap-2 transition-all duration-200 ease-in-out hover:gap-4 p-4 hover:bg-transparent rounded">
                    <span>Lihat Daftar Kursus</span>
                    <UIcon name="i-heroicons-chevron-down"/>
                </div>
            </UButton>
        </div>
        <!-- -- -->

        <!-- List of Courses -->
        <div id="daftar-kursus" class="pt-10 lg:pb-32 pb-8 lg:px-24 px-6">
            <h2 class="lg:text-4xl text-3xl mb-4" data-cy="homepage-list-of-courses-title">Daftar Kursus</h2>
            <div class="grid lg:grid-cols-3 grid-cols-1 lg:gap-8 gap-6">
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
