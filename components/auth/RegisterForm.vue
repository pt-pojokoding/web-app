<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const email = ref("");
const password = ref("");
const username = ref("");
const authStore = useAuthStore();

const handleRegister = async () => {
    await authStore.register(email.value, password.value, username.value);
};
</script>

<template>
    <UCard>
        <h1 class="text-2xl mb-4">Daftar</h1>
        <UForm class="flex flex-col gap-4" @submit="handleRegister">
            <UFormGroup label="Username" required>
                <UInput v-model="username" placeholder="Username" icon="i-heroicons-user" />
            </UFormGroup>
            <UFormGroup label="Email" required>
                <UInput
                    v-model="email"
                    placeholder="email@example.com"
                    icon="i-heroicons-envelope"
                />
            </UFormGroup>
            <UFormGroup label="Password" required>
                <UInput
                    v-model="password"
                    placeholder="Password"
                    type="password"
                    icon="i-heroicons-key"
                />
            </UFormGroup>
            <UButton color="primary" class="self-start" type="submit">Daftar</UButton>
        </UForm>
    </UCard>
</template>
