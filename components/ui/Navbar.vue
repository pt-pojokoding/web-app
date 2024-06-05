<script setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>

<template>
    <nav class="w-full bg-white dark:bg-bg border-b-2 navbar-height sticky top-0 z-10">
        <div class="container mx-auto px-4 flex items-center justify-between h-16">
            <div class="flex items-center gap-6">
                <NuxtLink to="/">
                    <img
                        src="~/assets/branding/Pojokoding-wordmark.svg"
                        alt="Logo"
                        class="logo h-8"
                    />
                </NuxtLink>
            </div>

            <div class="flex items-center gap-4">
                <NuxtLink to="/katalog-kursus"> Katalog Kursus </NuxtLink>

                <AuthGoogleSignInButton v-if="!authStore.user" />

                <NuxtLink to="/dashboard" class="font-bold text-primary" v-if="authStore.user"> Dashboard </NuxtLink>

                <UiNavbarDropdown v-if="authStore.user" />

                <UiColorModeToggle />
            </div>
        </div>
    </nav>
</template>
