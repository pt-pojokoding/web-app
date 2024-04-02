<script setup>
const contentStore = useContentStore();

const content = contentStore.currentContent;
</script>

<template>
    <div class="p-8">
        <h1 class="text-3xl">{{ content.displayTitle }}</h1>
        <div class="max-w-[570px]">
            <ContentArticleMarkdownRenderer></ContentArticleMarkdownRenderer>
            <ContentArticleQuiz></ContentArticleQuiz>
        </div>
    </div>
</template>
