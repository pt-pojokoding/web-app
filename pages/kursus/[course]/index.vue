<script setup>
// halaman detail kursus
// lazy fetch data detail kursus
const route = useRoute()
const courseSlug = ref(route.params.course)
const contentStore = useContentStore()

const course = await contentStore.getCourse(courseSlug.value)
const firstContentSlug = course.value.subcourses[0].contents[0].slug.current
const accordions = course.value.subcourses.map((subcourse) => {
    return {
        label: subcourse.title,
        contents: subcourse.contents
    }
})

</script>

<template>
    <div>
        <h1 class="text-6xl">{{ course.title }}</h1>

        <!-- $ Start Course Button -->
        <NuxtLink :to="`/kursus/${courseSlug}/${firstContentSlug}`">
            <UButton>Mulai Kursus</UButton>
        </NuxtLink>


        <!-- $ Accordion -->
        <UAccordion multiple :items="accordions">
            <template #item="{item}">
                <div v-for="(content, index) in item.contents" :key="index">
                    <NuxtLink :to="`/kursus/${courseSlug}/${content.slug.current}`">
                        <UButton>{{ content.displayTitle }}</UButton>
                    </NuxtLink>
                </div>
            </template>
        </UAccordion>

        <UCard>
            <pre>{{ course.subcourses }}</pre>
        </UCard>
    </div>
</template>