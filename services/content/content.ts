export const getContentData = async (contentSlug: string, courseSlug: string) => {
    const query = groq`
    *[
        _type == "content" &&
        slug.current == "${contentSlug}" &&
        course->slug.current == "${courseSlug}"
    ][0]{
        ...,
        "languageConfig": languageConfig->{...},
        "course": course->{_id, title, slug},
    }
    `;

    const { data: contentData } = await useSanityQuery(query);
    const content = contentData.value;
    return content;
};
