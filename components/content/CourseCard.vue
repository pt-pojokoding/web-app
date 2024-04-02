<script setup>
const props = defineProps({
    course: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <UCard>
        <pre>{{ props.course }}</pre>
        <NuxtLink :to="`/kursus/${props.course.slug.current}`">
            <UButton>
                Detail Kursus
            </UButton>
        </NuxtLink>
    </UCard>
</template>