import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const addNewUserAchievement = async (achievementId: string, userId: string, contentType: string) => {
    const { $db } = useNuxtApp();

    addDoc(collection($db, "userAchievement"), {
        id: uuidv4(),
        userId: userId,
        achievementId: achievementId,
        type: contentType,
    });
};
