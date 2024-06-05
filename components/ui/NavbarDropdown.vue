<script setup>
const authStore = useAuthStore();

const items = [
    [
        {
            label: authStore.user?.displayName || authStore.user?.email,
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
            to: "/dashboard/info-akun",
        }
    ]
];

console.log(authStore.user.photoURL);
</script>

<template>
    <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' }, padding: 'p-1', width: 'min-w-60' }"
        :popper="{ placement: 'bottom-start' }"
    >
        <UAvatar :src="authStore.user.photoURL" />

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
