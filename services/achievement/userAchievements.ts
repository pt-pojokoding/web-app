import { getDocs, query, collection, where } from "firebase/firestore";

export const getAllUserAchievements = async () => {
    const { $db } = useNuxtApp();
    const { user } = useAuthStore();
    const userAchievementQuery = query(
        collection($db, "userAchievement"),
        where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(userAchievementQuery);
    return querySnapshot.docs.map((doc) => doc.data()) as any;
};