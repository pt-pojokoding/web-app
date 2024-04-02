import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import type { Auth } from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
    const { $auth } = useNuxtApp();
    const auth = $auth as Auth;
    const router = useRouter();

    const user = ref<any | null>(null);
    
    const isLoading = ref<boolean>(true);

    // CEK USER YANG SEDANG LOGIN
    // Fungsi ini akan dijalankan saat awal aplikasi dijalankan di browser,
    // aplikasi tidak akan melakukan render pages dan layout sebelum fungsi ini selesai dijalankan
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

    function checkUser(): void {
        if (!user.value) {
            router.push("/login");
        }
    }

    async function register(email: string, password: string, username: string): Promise<void> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            if (userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName: username,
                    photoURL: `https://api.dicebear.com/7.x/identicon/svg?seed=${username}`,
                });

                user.value = userCredential.user;
            }

            router.push("/dashboard");
        } catch (error) {
            throw error;
        }
    }

    async function login(email: string, password: string): Promise<void> {
        console.log("Password", password, "Email", email);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                user.value = userCredential.user;
            }

            router.push("/dashboard");
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

    return { user, checkUser, isLoading, register, login, logout };
});
