<script setup>
const route = useRoute();
</script>

<template>
    <aside
        class="lg:w-[300px] p-4 border-r-2 border-slate-600 h-screen-minus-navbar overflow-auto sidebar-sticky bg-white dark:bg-bg"
    >
        <ContentSidebarContents></ContentSidebarContents>
    </aside>
</template>

<style scoped>
.sidebar-sticky {
    position: sticky;
    top: var(--navbar-height);
}
</style>
