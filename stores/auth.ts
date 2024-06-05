import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider,
} from "firebase/auth";
import type { Auth } from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
    const { $auth } = useNuxtApp();
    const auth = $auth as Auth;
    const router = useRouter();
    const toast = useToast();

    const user = ref<any | null>(null);

    const isLoading = ref<boolean>(true);

    // CEK USER YANG SEDANG LOGIN
    // Fungsi ini akan dijalankan saat awal aplikasi dijalankan di browser,
    // aplikasi tidak akan melakukan render pages dan layout sebelum fungsi ini selesai dijalankan
    // selama fungsi ini belum selesai dijalankan, akan ditampilkan loading spinner
    // sehingga nilai dari variabel user akan diupdate sesuai dengan user yang sedang login
    // dan tersedia saat page load  di seluruh aplikasi
    if (process.client) {
        onAuthStateChanged(auth, (firebaseUser: any) => {
            if (firebaseUser) {
                user.value = firebaseUser;
            } else {
                user.value = null;
            }
            isLoading.value = false;
        });
    }
    // --

    function checkUser({ redirectTo }: { redirectTo: string }): void {
        if (!user.value) {
            router.push(redirectTo);
        }
    }

    async function signInWithGoogle(): Promise<void> {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);

            if (userCredential.user) {
                user.value = userCredential.user;
                toast.add({
                    title: "Login Sukses",
                    description: `Anda telah login sebagai ${userCredential.user.displayName}`,
                });
            }
        } catch (error) {
            throw error;
        }
    }

    async function logout(): Promise<void> {
        try {
            await signOut(auth);
            user.value = null;
            router.push("/");
        } catch (error) {
            throw error;
        }
    }

    return { user, checkUser, isLoading, signInWithGoogle, logout };
});
