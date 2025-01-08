import { getDocs, collection, query, where, doc, getDoc } from "firebase/firestore";
import { useNuxtApp } from "#app";

export const getSidebarData = async (courseSlug: string) => {
    const { $db } = useNuxtApp();

    // Mengambil kursus berdasarkan slug
    const coursesCollection = collection($db, "courses");
    const courseQuery = query(coursesCollection, where("slug", "==", courseSlug));
    const courseQuerySnapshot = await getDocs(courseQuery);

    if (courseQuerySnapshot.empty) {
        console.error("No matching course found.");
        return null;
    }

    const courseDoc = courseQuerySnapshot.docs[0];
    const courseId = courseDoc.id;

    // Mengambil subcourses yang merujuk ke kursus ini
    const subcoursesCollection = collection($db, "subcourse");
    const subcoursesQuery = query(subcoursesCollection, where("course_id", "==", courseId));
    const subcoursesQuerySnapshot = await getDocs(subcoursesQuery);

    const subcourses = subcoursesQuerySnapshot.docs.map((subcourseDoc) => {
        const subcourseData = subcourseDoc.data();
        return {
            id: subcourseDoc.id,
            title: subcourseData.title,
            description: subcourseData.description,
            contents: []
        };
    });

    // Mengambil konten yang merujuk ke setiap subcourse
    const contentsPromises = subcourses.map(async (subcourse) => {
        const contentsCollection = collection($db, "contents");
        const contentsQuery = query(contentsCollection, where("subcourse_id", "==", subcourse.id));
        const contentsQuerySnapshot = await getDocs(contentsQuery);

        const contents = contentsQuerySnapshot.docs.map((contentDoc) => {
            const contentData = contentDoc.data();
            return {
                id: contentDoc.id,
                title: contentData.title,
                slug: contentData.slug,
                content_type: contentData.content_type,
            };
        });

        // Mengurutkan konten berdasarkan orderRank
        return {
            ...subcourse,
            contents: contents
        };
    });

    // Menunggu semua promise selesai
    const sidebar = await Promise.all(contentsPromises);

    return sidebar;
};
