export const getAllCourses = async () => {
    const query = groq`*[_type == "course"]{
        _id,
        _rev,
        "mainImage": mainImage.asset->url,
        title,
        slug,
        difficulty,
        shortDescription,
        postCount,
        exerciseCount,
        price,
        orderRank
    }`;
    const { data: courses } = await useSanityQuery(query);
    return courses
};