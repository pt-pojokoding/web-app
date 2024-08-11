<script setup>
import { renderMarkdown } from "~/services/content/renderMarkdown";
import { codeToHtml } from "shiki";

const useContent = useContentStore();
const markdown = useContent.currentContent.markdown;
const renderedMarkdown = renderMarkdown(markdown);

onMounted(async () => {
    const code = document.querySelector("code.language-js");
    if (code) {
        code.innerHTML = await codeToHtml(code.innerHTML, {
            theme: "tokyo-night",
            lang: "javascript",
        });
    }
});
</script>

<template>
    <div data-cy="article-markdown">
        <div v-html="renderedMarkdown" class="article" data-cy="article-markdown-content"></div>
    </div>
</template>

<style lang="postcss">
.toc-container {
    @apply dark:bg-slate-800 border shadow-sm p-4 my-4 rounded;
}

.toc-link {
    @apply hover:text-primary text-lg;
}

.article {
    @apply py-4;
}

.article h1,
.article h2 {
    @apply mt-5 mb-2;
}
.article p {
    @apply my-5 text-justify;
}

.article table {
    @apply w-full;
}

.article table td,
.article table th {
    @apply table-fixed border-solid border p-3;
}

.article ul {
    @apply list-disc list-inside;
}
.article ol {
    @apply list-decimal list-inside;
}
.article h1 {
    @apply text-3xl font-bold;
}
.article h2 {
    @apply text-2xl font-bold;
}

.article h3 {
    @apply text-xl font-bold;
}

.article pre {
    @apply bg-slate-800/60 text-white p-2 rounded;
}

.article strong {
    @apply font-bold text-primary;
} 
</style>
