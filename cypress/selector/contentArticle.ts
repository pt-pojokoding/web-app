export class ContentPage {
    getArticle() {
        return cy.get('[data-cy="article"]');
    }

    getArticleTitle() {
        return cy.get('[data-cy="article-title"]');
    }

    getArticleContentWrapper() {
        return cy.get('[data-cy="article-content-wrapper"]');
    }
}