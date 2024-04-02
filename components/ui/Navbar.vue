<script setup>
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const currentUser = authStore.user;
</script>

<template>
    <nav class="w-full bg-white dark:bg-slate-950 border-b-2 navbar-height sticky top-0 z-10">
        <div
            class="container mx-auto px-4 flex items-center justify-between h-16"
        >
            <div class="flex items-center bg-zinc-300 p-2 rounded">
                <NuxtLink to="/">
                    <img src="~/assets/svg/logo.svg" alt="Logo" class="logo h-8" />
                </NuxtLink>
            </div>

            <div v-if="!currentUser" class="flex items-center gap-4">
                <NuxtLink to="/daftar">
                    <UButton variant="solid">Daftar</UButton>
                </NuxtLink>
                <NuxtLink to="/masuk">
                    <UButton variant="solid">Login</UButton>
                </NuxtLink>
            </div>

            <div v-else class="flex items-center gap-4">
                <UiColorModeToggle/>
                <NuxtLink to="/dashboard">
                    <UButton variant="solid">Dashboard</UButton>
                </NuxtLink>
                <UiNavbarDropdown />
            </div>
        </div>
    </nav>
</template>
