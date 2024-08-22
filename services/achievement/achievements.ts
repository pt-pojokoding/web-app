import { getDocs, query, where, collection, addDoc } from "firebase/firestore";
import { type Achievement } from "@/types/achievement";

export const getAllAchievements = async () => {
    const { $db } = useNuxtApp();
    const achievementQuery = query(collection($db, "achievementDetail"));
    const querySnapshot = await getDocs(achievementQuery);
    return querySnapshot.docs.map((doc) => doc.data()) as Achievement[];
};