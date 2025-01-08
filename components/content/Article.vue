<script setup>
const contentStore = useContentStore();
</script>

<template>
    <div class="p-8" data-cy="article">
        <h1 class="text-4xl font-bold font-space-mono text-primary" data-cy="article-title">{{ contentStore.currentContent.title }}</h1>
        <div class="max-w-[570px]" data-cy="article-content-wrapper">
            <ContentArticleMarkdownRenderer />
            <ContentArticleQuiz v-if="contentStore.currentContent.quiz" class="my-8"></ContentArticleQuiz>
        </div>
    </div>
</template>
