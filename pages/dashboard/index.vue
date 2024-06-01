<script setup lang="ts">
const authStore = useAuthStore();
authStore.checkUser();

const tabsItems = [
    {
        slot: "kemajuan",
        label: "Kemajuan",
        title: "Kemajuan belajar kamu",
    },
    {
        slot: "achievement",
        label: "Pencapaian",
        title: "Pencapaian",
    },
    {
        slot: "katalog-kursus",
        label: "Katalog Kursus",
        title: "Daftar Kursus",
    },
    {
        slot: "edit-akun",
        label: "Edit Akun",
        title: "Edit Account Information",
    },
];
</script>

<template>
    <div>
        <h1>Selamat Datang {{ authStore.user.displayName || authStore.user.email }}</h1>
        <UTabs
            :items="tabsItems"
        >
            <template #kemajuan="{ item }">
                <UCard>
                    <h2 class="text-2xl font-bold">{{ item.title }}</h2>
                    <ProgressDashboardList></ProgressDashboardList>
                </UCard>
            </template>
            
            <template #achievement="{ item }">
                <UCard>
                    <h2 class="text-2xl font-bold">{{ item.title }}</h2>
                    <AchievementDashboardList class="mt-3" />
                </UCard>
            </template>

            <template #katalog-kursus="{item}">
                <UCard>
                    <h2 class="text-2xl font-bold">{{ item.title }}</h2>
                    <div class="grid grid-cols-4 gap-4">
                        <ContentCourseCatalog></ContentCourseCatalog>
                    </div>
                </UCard>
            </template>

            <template #edit-akun="{ item }">
                <UCard>
                    <h2 class="text-2xl font-bold">{{ item.title }}</h2>
                    <UserInfoDashboard></UserInfoDashboard>
                </UCard>
            </template>

        </UTabs>
    </div>
</template>
