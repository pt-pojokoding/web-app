<script setup>

</script>

<template>
    <aside
        class="lg:w-[250px] p-4 border-r-2 h-screen-minus-navbar overflow-auto sidebar-sticky bg-white dark:bg-bg"
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
