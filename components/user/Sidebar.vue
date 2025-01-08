<script setup>
const sidebarMenus = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: "i-heroicons-home",
    },
    // {
    //     name: "Pencapaian",
    //     path: "/dashboard/pencapaian",
    //     icon: "i-heroicons-star"
    // },
    {
        name: "Info Akun",
        path: "/dashboard/info-akun",
        icon: "i-heroicons-user"
    }
]

</script>

<template>
    <aside
        class="lg:w-[250px] p-4 border-r-2 h-screen-minus-navbar overflow-auto sidebar-sticky bg-white dark:bg-slate-950"
    >
        <div class="flex flex-col gap-4">
            <template v-for="(menu, index) in sidebarMenus" :key="index">
                <NuxtLink :to="menu.path">
                    <UButton :icon="menu.icon" class="w-full dark:text-white text-black" :variant="$route.path === menu.path ? 'solid' : 'ghost'" color="gray" size="xl">{{ menu.name }}</UButton>
                </NuxtLink>
            </template>
        </div>
    </aside>
</template>

<style scoped>
.sidebar-sticky {
    position: sticky;
    top: var(--navbar-height);
}
</style>