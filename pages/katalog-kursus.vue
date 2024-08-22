<script setup>
useSeoMeta({
    title: 'Katalog Kursus',
    ogTitle: 'Katalog Kursus'
})
</script>

<template>
    <div class="p-8">
        <h2 class="text-4xl mb-4" data-cy="course-catalog-page-title">Daftar Kursus</h2>
        <div class="grid grid-cols-3 gap-8">
            <ContentCourseCatalog></ContentCourseCatalog>
        </div>
    </div>
</template>
