<script setup>
import { codeToHtml } from "shiki";

const route = useRoute();
const contentStore = useContentStore();
const progressStore = useProgressStore();

await contentStore.getContent(route.params.content, route.params.course);

onMounted(async () => {
    const code = document.querySelector("code.language-js");
    if (code) {
        code.innerHTML = await codeToHtml(code.innerHTML, {
            theme: "tokyo-night",
            lang: "javascript",
        });
    }
});

useSeoMeta({
    title: contentStore.currentContent.displayTitle,
    ogTitle: contentStore.currentContent.displayTitle,
})
</script>

<template>
    <div>
        <div class="flex">
            <div>
                <ContentSidebar></ContentSidebar>
            </div>
            <div class="w-full">
                <ContentExercise v-if="contentStore.currentContent.contentType == 'exercise'"></ContentExercise>
                <ContentArticle v-if="contentStore.currentContent.contentType == 'post'"></ContentArticle>
                <!-- <Discussion></Discussion> -->
            </div>
        </div>
    </div>
</template>
