import { getDocs, collection, query, where, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export const getOneCourse = async (slug: string) => {
    const { $db, $storage } = useNuxtApp();
    const coursesCollection = collection($db, "courses");
    const courseQuery = query(coursesCollection, where("slug", "==", slug));
    const querySnapshot = await getDocs(courseQuery);

    if (querySnapshot.empty) {
        console.error("No matching documents.");
        return null;
    }

    const courseDoc = querySnapshot.docs[0];
    const course = {
        id: courseDoc.id,
        ...courseDoc.data()
    } as any;

    if (course.cover_image) {
        const imageRef = ref($storage, course.cover_image);
        try {
            course.cover_image = await getDownloadURL(imageRef);
        } catch (error) {
            console.error("Error fetching cover image URL for course:", course.id, error);
            course.cover_image = null;
        }
    }

    // Mengambil subcourses yang merujuk ke kursus ini
    const subcoursesCollection = collection($db, "subcourse");
    const subcoursesQuery = query(subcoursesCollection, where("course_id", "==", course.id));
    const subcoursesQuerySnapshot = await getDocs(subcoursesQuery);

    const subcourses = subcoursesQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    // Mengambil konten yang merujuk ke setiap subcourse
    const contentsPromises = subcourses.map(async (subcourse) => {
        const contentsCollection = collection($db, "contents");
        const contentsQuery = query(contentsCollection, where("subcourse_id", "==", subcourse.id));
        const contentsQuerySnapshot = await getDocs(contentsQuery);

        const contents = contentsQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            slug: doc.data().slug,
            content_type: doc.data().content_type
        }));

        return {
            ...subcourse,
            contents: contents
        };
    });

    // Menunggu semua promise selesai
    course.subcourses = await Promise.all(contentsPromises);

    return course;
};
