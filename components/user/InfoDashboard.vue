<script setup>
const authStore = useAuthStore();
const userStore = useUserStore();

const currentUser = authStore.user;
const name = ref(currentUser.displayName)
const email = ref(currentUser.email)

async function handleEditUserProfile(){
    await userStore.changeName(name.value)
}

</script>

<template>
    <div class="flex gap-4">
        <div>
            <UserInfoDashboardProfilePicture></UserInfoDashboardProfilePicture>
        </div>
        <div class="flex flex-col w-full">
            <UFormGroup label="Email" disabled>
                <UInput v-model="email" placeholder="you@example.com" icon="i-heroicons-envelope" />
            </UFormGroup>
            <UFormGroup label="Nama">
                <UInput v-model="name" icon="i-heroicons-user" />
            </UFormGroup>
            <UButton @click="handleEditUserProfile">Simpan</UButton>
        </div>
    </div>
</template> 
