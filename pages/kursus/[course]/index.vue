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
    <div class="px-20 py-8 space-y-4 min-h-screen flex gap-6 text-black dark:text-white">
        <div class="w-8/12 space-y-3">
            <h1 class="text-6xl">{{ course.title }}</h1>

            <!-- $ Description -->
            <div class="space-y-2">
                <p>{{ course.shortDescription }}</p>
            </div>
            <UDivider class="dark:*:border-slate-700" />
            <div class="space-y-2">
                <p>{{ course.description }}</p>
            </div>

            <!-- $ Prerequisites -->
            <div class="">
                <h4 class="font-semibold"><Icon name="pajamas:requirements" class="text-primary text-lg" /> Prasyarat</h4>
                <p>{{ course.prerequisites }}</p>
            </div>
            <div class="">
                <h4 class="font-semibold"><Icon name="ic:round-meeting-room" class="text-primary text-lg" /> Ruang lingkup pembelajaran</h4>
                <p>{{ course.learningScope }}</p>
            </div>
            <UCard class="">
                <h4 class="font-semibold">Yang akan anda pelajari</h4>
                <pre class="text-wrap">{{ course.learningObjectives }}</pre>
            </UCard>

            <!-- $ Accordion -->
            <div>
                <h3 class="text-4xl font-semibold mb-2">Materi Kursus</h3>
                <UAccordion multiple :items="accordions">
                    <template #item="{item}">
                        <div class="space-y-1">
                            <div v-for="(content, index) in item.contents" :key="index">
                                <NuxtLink :to="`/kursus/${courseSlug}/${content.slug.current}`">
                                    <UButton>{{ content.displayTitle }}</UButton>
                                </NuxtLink>
                            </div>
                        </div>
                    </template>
                </UAccordion>
            </div>

            <!-- <UCard>
                <pre>{{ course.subcourses }}</pre>
            </UCard> -->
            <UCard>
                <pre>{{ course }}</pre>
            </UCard>
        </div>
        <div class="w-4/12 space-y-3 px-3 py-2 bg-bg/5 dark:bg-white/5 rounded-lg h-fit">
            <img :src="course.image" class="aspect-video w-full bg-orange-400 rounded-md" />
            <!-- $ Start Course Button -->
            <div class="">
                <p class="ml-auto">Tinggat: {{ course.difficulty   }}</p>
                <p class="ml-auto">Harga: Rp. {{ course.price }}</p>
            </div>
            <NuxtLink :to="`/kursus/${courseSlug}/${firstContentSlug}`" class="block">
                <UButton class="w-full block">Mulai Kursus</UButton>
            </NuxtLink>
        </div>
    </div>
</template>