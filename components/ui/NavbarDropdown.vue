<script setup>
const authStore = useAuthStore();

const items = [
    [
        {
            label: authStore.user?.displayName || authStore.user?.email,
            slot: "account",
            disabled: true
        },

    ],
    [
        {
            label: "Akun",
            icon: "i-heroicons-user",
            to: "/dashboard/info-akun",
            datacy: "navbar-dropdown-account-info",
        },
    ],
    [
        {
            label: "Katalog Kursus",
            icon: "i-heroicons-book-open",
            to: "/katalog-kursus",
            datacy: "navbar-dropdown-course-catalog",
        },
    ],
    [
        {
            label: "Keluar",
            icon: "i-heroicons-arrow-left-on-rectangle",
            click: () => authStore.logout(),
            datacy: "navbar-dropdown-logout",
        },
    ],
];

</script>

<template>
    <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' }, padding: 'p-1', width: 'min-w-60' }"
        :popper="{ placement: 'bottom-start' }"
    >
        <UAvatar :src="authStore.user.photoURL" data-cy="navbar-dropdown-avatar"/>

        <template #account="{ item }">
            <div class="text-left">
                <p data-cy="navbar-dropdown-logged-in-as-text">Masuk Sebagai</p>
                <p data-cy="navbar-dropdown-logged-in-as-username" class="truncate font-medium text-gray-900 dark:text-white">
                    {{ item.label }}
                </p>
            </div>
        </template>

        <template #item="{ item }">
            <div :data-cy="item.datacy" class="flex justify-between w-full">
                <span class="truncate">{{ item.label }}</span>
    
                <UIcon
                    :name="item.icon"
                    class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
                />
            </div>
        </template>
    </UDropdown>
</template>
