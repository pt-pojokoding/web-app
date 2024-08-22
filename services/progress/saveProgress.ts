import { collection, addDoc, Timestamp, getDocs, query, where, getDoc } from "firebase/firestore";

export const saveProgressService = async (progressData: {
    userId: string;
    contentId: string;
    courseId: string;
    contentType: string;
    usersCode?: string;
}) => {
    const { $db } = useNuxtApp();

    const newProgress = {
        ...progressData,
        createdAt: Timestamp.fromDate(new Date()),
    };


    // Get existing progress documents with the same userId and contentId
    const progressQuery = query(
        collection($db, "progress"),
        where("userId", "==", progressData.userId),
        where("contentId", "==", progressData.contentId)
    );

    const querySnapshot = await getDocs(progressQuery);

    // If no documents found, add the progress
    if (querySnapshot.empty) {
        const progressRef = await addDoc(collection($db, "progress"), newProgress);
        const progressSnapshot = await getDoc(progressRef);
        const progressData = progressSnapshot.data();
        return progressData;
    } else {
        console.log(
            "Progress for this content already exists for this user. Not adding new progress."
        );
    }
};
