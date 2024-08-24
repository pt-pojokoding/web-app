export class HomepageHeader {
    getHeaderTitle() {
        return cy.get('[data-cy="header-title"]');
    }

    getHeaderShortDescription() {
        return cy.get('[data-cy="header-short-description"]');
    }

    getHeaderLookCourseListButton() {
        return cy.get('[data-cy="header-look-course-list-button"]');
    }
}