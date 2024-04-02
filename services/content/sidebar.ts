export const getSidebarData = async (courseSlug: string) => {
    const query = groq`
    *[_type == "subcourse" && course->slug.current == "${courseSlug}"]{
        title,
        description,
        orderRank,
        "contents": contents[]->{
            _id,
            displayTitle,
            slug,
            contentType,
            orderRank
        } | order(orderRank asc)
    } | order(orderRank asc)
    `;

    const { data: sidebarData } = await useSanityQuery(query);
    const sidebar = sidebarData.value;
    return sidebar;
};
