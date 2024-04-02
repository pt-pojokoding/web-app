// @ts-ignore
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItTocDoneRight from 'markdown-it-toc-done-right'

export const renderMarkdown = (markdown: string) => {
    const tocOptions = {
        containerClass: "toc-container",
        itemClass: "toc-item",
        linkClass: "toc-link",
        listClass: "toc-list",
        level: 2,
    }
    
    const md = new MarkdownIt();
    md.use(MarkdownItAnchor);
    md.use(MarkdownItTocDoneRight, tocOptions);
    
    const renderedMarkdown = md.render(markdown);
    return renderedMarkdown;
}