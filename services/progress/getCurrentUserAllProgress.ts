// @ts-nocheck
import { query, collection, where, getDocs, getDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

/**
 * To track the number of content a course have, use a form in CMS that admin need to fill manually
 * but make the from fetch the count data dynamically so admin doesnt have to count manually
 * then write a worker that reset the value of content count periodically
 */

export const getCurrentUserAllProgress = async (userId: string) => {
    const { $db, $storage } = useNuxtApp();
    let finishedArticleCount = 0
    let finishedExerciseCount = 0
    let finishedQuizCount = 0
    const coursesData = []

    // Get all from progress collection with userId = current user id
    const progressRef = collection($db, "progress");
    const q = query(progressRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const progress = querySnapshot.docs.map((doc) => doc.data());

    // Filter unique courseId from array of progress object that user have
    const courseIdList = progress.map((item) => item.courseId);
    const uniqueCourseIdList = [...new Set(courseIdList)];

    // fetch course data from each courseId 
    for (const courseId of uniqueCourseIdList) {
        const courseRef = doc($db, "courses", courseId)
        const courseSnap = await getDoc(courseRef)
        const courseDataObject = courseSnap.data()
        courseDataObject.cover_image = await getDownloadURL(ref($storage, courseDataObject.cover_image));

        if (courseSnap.exists()) {
            progress.forEach((item: any, index: number) => {
                if (item.courseId === courseId) {
                    if (item.contentType === "article") finishedArticleCount++
                    if (item.contentType === "exercise") finishedExerciseCount++
                    if (item.contentType === "quiz") finishedQuizCount++
                }
            })

            const totalContent = courseDataObject.article_count + courseDataObject.exercise_count + courseDataObject.quiz_count
            const totalCompletedContent = finishedArticleCount + finishedExerciseCount + finishedQuizCount
            const completionPercentage = Math.round((totalCompletedContent / totalContent) * 100)

            coursesData.push({
                id: courseSnap.id,
                ...courseDataObject,
                finishedArticleCount,
                finishedExerciseCount,
                finishedQuizCount,
                completionPercentage
            })

            finishedArticleCount = 0
            finishedExerciseCount = 0
            finishedQuizCount = 0
        } else {
            console.log("no course with that id")
        }
    }

    if (coursesData.length == 0) {
        return null
    } else {
        return coursesData
    }
};