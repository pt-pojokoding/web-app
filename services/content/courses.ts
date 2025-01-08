// path/to/your/firebase/functions.js
import { getDocs, collection } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export const getAllCourses = async () => {
    const { $db, $storage } = useNuxtApp();
    const coursesCollection = collection($db, "courses");
    const querySnapshot = await getDocs(coursesCollection);
    const courses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as any[];

    // Membuat array promise untuk mengambil URL gambar
    const imagePromises = courses.map(async (course) => {
        if (course.cover_image) {
            const imageRef = ref($storage, course.cover_image);
            try {
                course.cover_image = await getDownloadURL(imageRef);
            } catch (error) {
                console.error("Error fetching cover image URL for course:", course.id, error);
                course.cover_image = null;
            }
        }
        return course;
    });

    // Menunggu semua promise selesai
    return await Promise.all(imagePromises);
};
