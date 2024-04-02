import { query, collection, where, getDocs, orderBy } from "firebase/firestore";

/**
 * Get the current user's progress for a specific course
 * @param userId 
 * @param courseId 
 * @returns 
 */
export const getCurrentUserProgress = async (userId: string, courseId: string) => {
    const { $db } = useNuxtApp()

    // @ts-ignore
    const progressRef = collection($db, "progress")
    const q = query(
      progressRef, 
      where("userId", "==", userId), 
      where("courseId", "==", courseId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const progress = querySnapshot.docs.map((doc) => doc.data());
    
    return progress
};