<script setup>
import { renderMarkdown } from "~/services/content/renderMarkdown";

const useContent = useContentStore();
const markdown = useContent.currentContent.markdown;
const renderedMarkdown = renderMarkdown(markdown);
</script>

<template>
    <div data-cy="article-markdown">
        <div v-html="renderedMarkdown" class="markdown-style post-style" data-cy="article-markdown-content"></div>
    </div>
</template>