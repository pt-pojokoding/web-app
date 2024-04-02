// @ts-nocheck
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

export const useUserStore = defineStore("user", () => {
    const { $auth } = useNuxtApp();
    const { $storage } = useNuxtApp();
    const authStore = useAuthStore();

    async function changeName(newUsername: string) {
        console.log(newUsername);
        try {
            await updateProfile($auth.currentUser, { displayName: newUsername });
            console.log("Berhasil mengganti nama");
        } catch (error) {
            console.log(error);
        }
    }

    async function uploadProfilePicture(file: any) {
        if (file) {
            const storageRef = ref($storage, `users/${authStore.user.uid}/profilePicture`);
            const snapshot = await uploadBytes(storageRef, file);
            const pictureUrl = await getDownloadURL(snapshot.ref);
            await updateProfile(authStore.user, { photoURL: pictureUrl });
        } else {
            alert("File is not provided");
        }
    }

    return { changeName, uploadProfilePicture };
});
