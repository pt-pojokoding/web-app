<script setup>
const route = useRoute();
const contentStore = useContentStore();
const progressStore = useProgressStore();

await contentStore.getContent(route.params.content, route.params.course);
const currentContent = contentStore.currentContent;
</script>

<template>
    <div>
        <div class="flex">
            <div>
                <ContentSidebar></ContentSidebar>
            </div>
            <div class="w-full">
                <ContentExercise v-if="currentContent.contentType == 'exercise'"></ContentExercise> 
                <ContentArticle v-if="currentContent.contentType == 'post'"></ContentArticle> 
                <!-- <Discussion></Discussion> -->
            </div>
        </div>
    </div>
</template>
