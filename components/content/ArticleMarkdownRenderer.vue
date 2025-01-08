<script setup>
import { renderMarkdown } from "~/services/content/renderMarkdown";

const useContent = useContentStore();
const markdown = useContent.currentContent.body.find(item => item.type === "text");

const renderedMarkdown = renderMarkdown(markdown.value);
</script>

<template>
    <div data-cy="article-markdown">
        <div v-html="renderedMarkdown" class="markdown-style post-style" data-cy="article-markdown-content"></div>
    </div>
</template>