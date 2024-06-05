// @ts-nocheck
import { query, collection, where, getDocs } from "firebase/firestore";

export const getCurrentUserAllProgress = async (userId: string) => {
    const { $db } = useNuxtApp();

    // fetch semua progress yang dimiliki user
    const progressRef = collection($db, "progress");
    const q = query(progressRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const progress = querySnapshot.docs.map((doc) => doc.data());
    console.log("Progress for this user: ", progress);

    // Dari semua progress yang didapat, ambil semua courseId yang muncul, dan masukan kedalam array
    const courseIdList = progress.map((item) => item.courseId);
    const uniqueCourseIdList = [...new Set(courseIdList)];
    console.log("Unique course id list: ", uniqueCourseIdList);

    // fetch data semua course menggunakan array courseId dari langkah sebelumnya 
    let courseData = [];
    for (const courseId of uniqueCourseIdList) {
        const courseQuery = groq`*[_type == "course" && _id == "${courseId}"][0]{
            ...,
            "mainImage": mainImage.asset->url,
        }`;
        const { data: courseResult } = await useSanityQuery(courseQuery);
        courseData.push(courseResult.value);
    }
    console.log("Course data: ", courseData);

    // untuk setiap courseData, iterasi usersProgress
    // jika courseId dari courseData sama dengan item usersProgress maka tambah artikelSelesai atau latihanSelesai
    // setelah selesai, push properti artikelSelesai dan latihanSelesai ke courseData
    for (const course of courseData) {
        let finishedArticle = 0;
        let finishedExercise = 0;
        for (const item of progress) {
            console.log("Item: ", item);
            if (item.courseId === course._id) {
                if (item.contentType === "post") {
                    finishedArticle++;
                } else if (item.contentType === "exercise") {
                    finishedExercise++;
                }
            }
        }
        course.finishedArticle = finishedArticle;
        course.finishedExercise = finishedExercise;
        const totalItems = course.postCount + course.exerciseCount;
        const totalCompleted = finishedArticle + finishedExercise;
        course.completionPercentage = totalItems > 0 ? (totalCompleted / totalItems) * 100 : 0;
        console.log("Individual Course When injecting artikelselesai: ", course);
    }

    console.log("Course data FINAL: ", courseData);

    if(courseData.length == 0){
        return null   
    } else {
        return courseData
    }
};