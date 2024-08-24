import { getDocs, query, where, collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const addExerciseAchievement = async ({ completedExerciseLength }: { completedExerciseLength: number }) => {
    const toast = useToast();
    console.log("Adding exercise achievement");
    const { $db } = useNuxtApp();
    const { user } = useAuthStore();
    // TODO: Add quiz achievement to user's achievements
    // await addDoc(collection($db, "progress"), newProgress);
    const exerciseAchievementQuery = query(
        collection($db, "achievementDetail"),
        where("type", "==", "exercise")
    );
    const userExerciseAchievementQuery = query(
        collection($db, "userAchievement"),
        where("type", "==", "exercise")
    );
    console.log("count exercise achievement: ", completedExerciseLength);

    const exerciseAchievementSnapshot = await getDocs(exerciseAchievementQuery);
    const userExerciseAchievementSnapshot = await getDocs(userExerciseAchievementQuery);
    const exerciseAchievementList = exerciseAchievementSnapshot.docs.map((doc) => doc.data());
    console.log(
      exerciseAchievementList
            .filter((q) => q.minExercise <= completedExerciseLength)
            .sort((a, b) => b.minExercise - a.minExercise)
    );
    const idExerciseAchievementYangDiraih = exerciseAchievementList
        .filter((q) => q.minExercise <= completedExerciseLength)
        .sort((a, b) => b.minExercise - a.minExercise)[0].id;
    const checkIfUserAlreadyHasTheExerciseAchievement =
        userExerciseAchievementSnapshot.docs.filter(
            (doc) =>
                doc.data().userId === user.uid &&
                doc.data().achievementId === idExerciseAchievementYangDiraih
        ).length > 0;
    console.log(
        "checkIfUserAlreadyHasTheExerciseAchievement: ",
        checkIfUserAlreadyHasTheExerciseAchievement
    );
    console.log(exerciseAchievementList);
    if (checkIfUserAlreadyHasTheExerciseAchievement) return;
    toast.add({
        title: "Anda mendapatkan achievement baru!😁👌",
        description: `Selamat! Anda telah menyelesaikan ${completedExerciseLength} Exercise!`,
    });
    addDoc(collection($db, "userAchievement"), {
        id: uuidv4(),
        userId: user.uid,
        achievementId: idExerciseAchievementYangDiraih,
        type: "exercise",
    });
};

const checkExercise = async () => {
    const { $db } = useNuxtApp();

    const { user } = useAuthStore();
    console.log("checking quiz for user: ", user);
    // console.log("checking quiz for user: ", user.value.value);

    const exerciseQuery = query(
        // @ts-ignore
        collection($db, "progress"),
        where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(exerciseQuery);

    if (querySnapshot.empty) {
        console.log("No Exercise found for this user");
    } else {
        const completedExerciseLength = querySnapshot.docs.filter(
            (doc) => doc.data().contentType === "exercise"
        ).length;
        console.log("completed exercise length: ", completedExerciseLength);
        addExerciseAchievement({ completedExerciseLength });
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

export { getAllUserAchievements, getAchivementById };

export default checkExercise;
