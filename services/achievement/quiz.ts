import { getDocs, query, where, collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useAchievementStore } from "~/stores/achievement";

const addQuizAchievement = async ({ completedQuizLength }: { completedQuizLength: number }) => {
    const toast = useToast();
    console.log("Adding quiz achievement");
    const { $db } = useNuxtApp();
    const { user } = useAuthStore();
    // TODO: Add quiz achievement to user's achievements
    // await addDoc(collection($db, "progress"), newProgress);
    const quizAchievementQuery = query(
        collection($db, "achievementDetail"),
        where("type", "==", "quiz")
    );
    const userQuizAchievementQuery = query(
        collection($db, "userAchievement"),
        where("type", "==", "quiz")
    );
    console.log("count quiz achievement: ", completedQuizLength);

    const quizAchievementSnapshot = await getDocs(quizAchievementQuery);
    const userQuizAchievementSnapshot = await getDocs(userQuizAchievementQuery);
    const quizAchievementList = quizAchievementSnapshot.docs.map((doc) => doc.data());
    console.log(
        quizAchievementList
            .filter((q) => q.minQuiz <= completedQuizLength)
            .sort((a, b) => b.minQuiz - a.minQuiz)
    );
    const idQuizAchievementYangDiraih = quizAchievementList
        .filter((q) => q.minQuiz <= completedQuizLength)
        .sort((a, b) => b.minQuiz - a.minQuiz)[0].id;
    const checkIfUserAlreadyHasTheQuizAchievement =
        userQuizAchievementSnapshot.docs.filter(
            (doc) =>
                doc.data().userId === user.uid &&
                doc.data().achievementId === idQuizAchievementYangDiraih
        ).length > 0;
    console.log(
        "checkIfUserAlreadyHasTheQuizAchievement: ",
        checkIfUserAlreadyHasTheQuizAchievement
    );
    console.log(quizAchievementList);
    if (checkIfUserAlreadyHasTheQuizAchievement) return;
    toast.add({
        title: "Anda mendapatkan achievement baru!😁👌",
        description: `Selamat! Anda telah menyelesaikan ${completedQuizLength} quiz!`,
    });
    addDoc(collection($db, "userAchievement"), {
        id: uuidv4(),
        userId: user.uid,
        achievementId: idQuizAchievementYangDiraih,
        type: "quiz",
    });
};

const checkQuiz = async () => {
    const { $db } = useNuxtApp();

    const { user } = useAuthStore();
    console.log("checking quiz for user: ", user);
    // console.log("checking quiz for user: ", user.value.value);

    const quizQuery = query(
        // @ts-ignore
        collection($db, "progress"),
        where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(quizQuery);

    if (querySnapshot.empty) {
        console.log("No quiz found for this user");
    } else {
        const completedQuizLength = querySnapshot.docs.filter(
            (doc) => doc.data().contentType === "post"
        ).length;
        console.log("completed quiz length: ", completedQuizLength);
        addQuizAchievement({ completedQuizLength });
    }
};

const getAllUserAchievements = async () => {
    const { $db } = useNuxtApp();
    const { user } = useAuthStore();
    const userAchievementQuery = query(
        collection($db, "userAchievement"),
        where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(userAchievementQuery);
    return querySnapshot.docs.map((doc) => doc.data());
};

const getAchivementById = async (achievementId: string) => {
    const { $db } = useNuxtApp();
    const achievementQuery = query(
        collection($db, "achievementDetail"),
        where("id", "==", achievementId)
    );
    const querySnapshot = await getDocs(achievementQuery);
    return querySnapshot.docs.map((doc) => doc.data())[0];
};

// const fetchAllAchievements = async () => {
//     const { $db } = useNuxtApp();
//     const { setAchievement } = useAchievementStore();
//     const achievementQuery = query(collection($db, "achievementDetail"));
//     const querySnapshot = await getDocs(achievementQuery);
//     setAchievement(querySnapshot.docs.map((doc) => doc.data()) as AchievementState[]);
// };

// const fetchAllUserAchievements = async () => {
//     const { $db } = useNuxtApp();
//     const { setUserAchievement } = useAchievementStore();
//     const { user } = useAuthStore();
//     const userAchievementQuery = query(
//         collection($db, "userAchievement"),
//         where("userId", "==", user.uid)
//     );
//     const querySnapshot = await getDocs(userAchievementQuery);
//     setUserAchievement(querySnapshot.docs.map((doc) => doc.data()) as AchievementState[]);
// };

// const fetchUserDoneQuizAndExerciseCount = async () => {
//     const { $db } = useNuxtApp();
//     const { userExerciseDoneCount, userQuizDoneCount } = storeToRefs(useAchievementStore());
//     const { user } = useAuthStore();
//     const userProgressQuery = query(collection($db, "progress"), where("userId", "==", user.uid));
//     const querySnapshot = await getDocs(userProgressQuery);
//     const userProgress = querySnapshot.docs.map((doc) => doc.data());
//     userQuizDoneCount.value = userProgress.filter((a) => a.contentType === "post").length
//     userExerciseDoneCount.value = userProgress.filter((a) => a.contentType === "exercise").length
// };

// const fetchAchievement = async () => {
//     await fetchAllAchievements();
//     await fetchAllUserAchievements();
//     await fetchUserDoneQuizAndExerciseCount();
// };

export { getAllUserAchievements, getAchivementById };

export default checkQuiz;
