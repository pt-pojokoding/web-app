<script setup>
/**
 * user upload pictures ->
 * TODO: validation ->
 * open modal ->
 * user crop image ->
 * get cropped image ->
 * upload cropped image
 */
import { CircleStencil, Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToast();
const currentUser = authStore.user;

const newImg = ref("");
const isModalOpen = ref(false);
const cropperRef = ref(null);

const dropdownItems = [
    [
        {
            label: "Upload Foto",
            icon: "i-heroicons-arrow-up-on-square",
            slot: "upload",
        },
        {
            label: "Hapus Foto",
            icon: "i-heroicons-trash",
            onClick: () => {
                console.log("Remove");
            },
        },
    ],
];

function setImage(e) {
    const file = e.target.files[0];

    // // Validation
    // if (!imageValidation(file)) {
    //     return;
    // }

    if (file) {
        // Create a URL for the uploaded image
        newImg.value = URL.createObjectURL(file);
        isModalOpen.value = true;
    }
}

function change({ coordinates, canvas }) {
    console.log(coordinates, canvas);
}

async function uploadImage() {
    const { canvas } = cropperRef.value.getResult();
    if (canvas) {
        canvas.toBlob(async (blob) => {
            await userStore.uploadProfilePicture(blob);
        }, "image/jpeg");

        isModalOpen.value = false;
        toast.add({
            title: "Berhasil",
            description: "Foto profil berhasil diubah",
            variant: "success",
        });
    }
}
</script>

<template>
    <div>
        <div class="w-60 h-60 relative">
            <UAvatar
                :src="currentUser.photoURL"
                alt="Profile Pic"
                size="dashboard"
                :ui="{
                    size: {
                        dashboard: 'h-52 w-52 text-2xl',
                    },
                }"
            />
            <UDropdown :items="dropdownItems" class="absolute right-6 bottom-6">
                <UButton variant="ghost" icon="i-heroicons-pencil"></UButton>
    
                <template #upload>
                    <div class="relative">
                        <UButton>Unggah Foto</UButton>
                        <input
                            ref="input"
                            type="file"
                            name="image"
                            accept="image/*"
                            @change="setImage"
                            class="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                </template>
            </UDropdown>
        </div>
        <UModal v-model="isModalOpen">
            <div class="p-4">
                <cropper
                    class="cropper"
                    ref="cropperRef"
                    :src="newImg"
                    :stencil-component="CircleStencil"
                    :stencil-props="{
                        handlers: {},
                        movable: false,
                        resizable: false,
                    }"
                    :stencil-size="{
                        width: 400,
                        height: 400,
                    }"
                    image-restriction="stencil"
                    @change="change"
                />
                <UButton @click="uploadImage">Simpan</UButton>
            </div>
        </UModal>
    </div>
</template>
