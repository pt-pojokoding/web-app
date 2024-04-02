<script setup>
import { useAuthStore } from "@/stores/auth";

// TODO: Form validation
// TODO: Error handlign
// TODO: Loading State
const authStore = useAuthStore();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
    await authStore.login(email.value, password.value);
};
</script>

<template>
    <UCard>
        <!-- TODO: Kalo udah login tombol pergi ke dsahboard -->
        <h1 class="text-2xl mb-4">Masuk</h1>
        <UForm class="flex flex-col gap-4" @submit="handleLogin">
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
            <UButton color="primary" type="submit">Masuk</UButton>
        </UForm>
    </UCard>
</template>
