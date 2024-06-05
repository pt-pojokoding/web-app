import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

export default defineNuxtPlugin((nuxtApp) => {
    const config = {
        apiKey: "AIzaSyCTm_47x7wyg8qPrSYKNVXPls0W0Ppi8AI",
        authDomain: "pojokoding-startup.firebaseapp.com",
        projectId: "pojokoding-startup",
        storageBucket: "pojokoding-startup.appspot.com",
        messagingSenderId: "437430484981",
        appId: "1:437430484981:web:310d6db7fc92364fa6aabc",
        measurementId: "G-ZQHR60DELH"
    };

    const app = initializeApp(config);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const analytics = getAnalytics(app);

    console.log("Firebase client initialized");

    // nuxtApp.provide("auth", auth);
    // nuxtApp.provide("db", db);
    // nuxtApp.provide("storage", storage);
    // nuxtApp.provide("analytics", analytics);

    auth.languageCode = "id";

    return {
        provide: {
            db,
            auth,
            storage,
            analytics,
        },
    };
});