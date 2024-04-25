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
    @apply dark:bg-slate-800 border shadow-sm p-4 my-4 rounded absolute right-8 top-20 w-4/12
}

.toc-link {
    @apply hover:text-primary text-lg
}

.article {
    @apply py-4
}

.article h1, .article h2 {
    @apply mt-5 mb-2
}

.article p {
    @apply my-2 text-justify
}

.article table td, .article table th {
    @apply table-fixed border-solid border px-2
}

.article ul {
    @apply list-disc list-inside
}

.article ol {
    @apply list-decimal list-inside
}

.article h1 {
    @apply text-2xl
}

.article h2 {
    @apply text-xl font-semibold
}

.article pre {
    @apply bg-slate-800/60 text-white p-2 rounded
}
</style>