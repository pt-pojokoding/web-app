<script setup>
const authStore = useAuthStore();

authStore.checkUser({ redirectTo: '/login' });

useSeoMeta({
    title: 'Dashboard',
    ogTitle: 'Dashboard',
})
</script>

<template>
    <div class="flex">
        <UserSidebar />
        <div class="p-8 w-full">
            <section class="pb-10">
                <h2 class="text-2xl font-bold mb-8">Kemajuan Belajar</h2>
                <ProgressDashboardList/>
            </section>
        </div>
    </div>
</template>