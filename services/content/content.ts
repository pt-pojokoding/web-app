import { getDocs, collection, query, where } from "firebase/firestore";
import { useNuxtApp } from "#app";

export const getContentData = async (contentSlug: string) => {
    const { $db } = useNuxtApp();
    const contentsCollection = collection($db, "contents");
    const contentQuery = query(contentsCollection, where("slug", "==", contentSlug));
    const querySnapshot = await getDocs(contentQuery);

    if (querySnapshot.empty) {
        console.error("No matching documents.");
        return null;
    }

    const contentDoc = querySnapshot.docs[0];

    let content = {
        id: contentDoc.id,
        ...contentDoc.data()
    } as any;

    if (content.content_type === "exercise") {
        content = {
            ...content,
            body: content.body.map((item: any) => {
                if (item.type === "starting_code" || item.type === "compile_code") {
                    return {
                        ...item,
                        value: item.value.replace(/^```|```$/g, '').trim()
                    };
                }
                return item;
            })
        };
    }

    console.log(content)
    return content;
};
