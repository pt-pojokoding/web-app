<script setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();

const dropdownNotAuthenticatedItems = [
    [
        {
            label: "Katalog Kursus",
            icon: "i-heroicons-book-open",
            to: "/katalog-kursus",
        },
    ],
    [
        {
            slot: "sign-in",
        },
    ],
];
</script>

<template>
    <nav class="w-full bg-white dark:bg-bg border-b-2 border-slate-600 navbar-height sticky top-0 z-10">
        <div class="container mx-auto px-4 flex items-center justify-between h-16">
            <div class="flex items-center gap-6">
                <NuxtLink to="/" data-cy="navbar-logo">
                    <img src="~/assets/branding/Pojokoding-wordmark.svg" alt="Logo" class="logo h-8" />
                </NuxtLink>
            </div>

            <!-- $ Desktop -->
            <div class="hidden lg:flex items-center gap-4">
                <NuxtLink to="/katalog-kursus" data-cy="navbar-catalog-course-desktop"> Katalog Kursus </NuxtLink>

                <AuthGoogleSignInButton v-if="!authStore.user" />

                <NuxtLink to="/dashboard" class="font-bold text-primary" v-if="authStore.user" data-cy="navbar-dashboard-desktop">
                    Dashboard
                </NuxtLink>

                <UiNavbarDropdown v-if="authStore.user" />

                <UiColorModeToggle />
            </div>

            <!-- $ Mobile -->
            <div class="flex lg:hidden items-center gap-3">
                <UiColorModeToggle />
                <UDropdown v-if="!authStore.user" :items="dropdownNotAuthenticatedItems">
                    <UButton color="white" data-cy="navbar-dropdown-hamburger">
                        <UIcon name="i-heroicons-bars-3" />
                    </UButton>

                    <template #sign-in>
                        <AuthGoogleSignInButton v-if="!authStore.user" />
                    </template>
                </UDropdown>

                <UiNavbarDropdown v-if="authStore.user" />
            </div>
        </div>
    </nav>
</template>
