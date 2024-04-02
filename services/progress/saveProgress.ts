import { collection, addDoc, Timestamp, getDocs, query, where } from "firebase/firestore";

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

    console.log("Incoming progress data: ", progressData)

    // Get existing progress documents with the same userId and contentId
    const progressQuery = query(
        // @ts-ignore
        collection($db, "progress"),
        where("userId", "==", progressData.userId),
        where("contentId", "==", progressData.contentId)
    );

    const querySnapshot = await getDocs(progressQuery);

    // If no documents found, add the progress
    if (querySnapshot.empty) {
        // @ts-ignore
        const progressRef = await addDoc(collection($db, "progress"), newProgress);
        console.log("New progress with id: ", progressRef);
    } else {
        console.log(
            "Progress for this content already exists for this user. Not adding new progress."
        );
    }
};
