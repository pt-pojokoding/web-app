export class ArticleMarkdown {
    getArticleMarkdown() {
        return cy.get('[data-cy="article-markdown"]');
    }

    getArticleMarkdownContent() {
        return cy.get('[data-cy="article-markdown-content"]');
    }
}
