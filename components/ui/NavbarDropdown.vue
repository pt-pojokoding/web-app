<script setup>
const authStore = useAuthStore();
const currentUser = authStore.user;

const items = [
    [
        {
            label: authStore.user?.email,
            slot: "account",
            disabled: true,
        },
    ],
    [
        {
            label: "Keluar",
            icon: "i-heroicons-arrow-left-on-rectangle",
            click: () => authStore.logout(),
        },
    ],
    [
        {
            label: "Akun",
            icon: "i-heroicons-user",
            to: "/dashboard/akun",
        }
    ]
];
</script>

<template>
    <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
    >
        <UAvatar :src="currentUser.photoURL" />

        <template #account="{ item }">
            <div class="text-left">
                <p>Masuk Sebagai</p>
                <p class="truncate font-medium text-gray-900 dark:text-white">
                    {{ item.label }}
                </p>
            </div>
        </template>

        <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon
                :name="item.icon"
                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
        </template>
    </UDropdown>
</template>
