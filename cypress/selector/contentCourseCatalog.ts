export class CourseCatalog {
    getCourseCatalogPageTitle() {
        return cy.get('[data-cy="course-catalog-page-title"]');
    }

    getCourseCatalog() {
        return cy.get('[data-cy^="course-catalog-"]');
    }

    getCourseCatalogLink(courseId: string) {
        return cy.get(`[data-cy="course-catalog-link-${courseId}"]`);
    }

    getCourseCatalogLinkAll() {
        return cy.get('[data-cy^="course-catalog-link-"]');
    }

    getCourseCatalogContainer(courseId: string) {
        return cy.get(`[data-cy="course-catalog-${courseId}-container"]`);
    }

    getCourseCatalogImage(courseId: string) {
        return cy.get(`[data-cy="course-catalog-${courseId}-image"]`);
    }

    getCourseCatalogContent(courseId: string) {
        return cy.get(`[data-cy="course-catalog-${courseId}-content"]`);
    }

    getCourseCatalogTitle(courseId: string) {
        return cy.get(`[data-cy="course-catalog-${courseId}-title"]`);
    }

    getCourseCatalogDescription(courseId: string) {
        return cy.get(`[data-cy="course-catalog-${courseId}-description"]`);
    }
}
