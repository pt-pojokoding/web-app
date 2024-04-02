<script setup>
import { renderMarkdown } from '~/services/content/renderMarkdown';

const useContent = useContentStore();
const markdown = useContent.currentContent.markdown;
const renderedMarkdown = renderMarkdown(markdown);

</script>

<template>
    <div>
        <div v-html="renderedMarkdown" class="article"></div>
    </div>
</template>

<style lang="postcss">
.toc-container {
    @apply dark:bg-slate-800 border shadow-sm p-4 my-4 rounded
}

.toc-link {
    @apply hover:text-primary text-lg
}
</style>