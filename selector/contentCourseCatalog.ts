class CourseCatalog {
    getCourseCatalog() {
        return cy.get('[data-cy^="course-catalog-"]');
    }

    getCourseCatalogLink() {
        return cy.get('[data-cy="course-catalog-link"]');
    }

    getCourseCatalogContainer(courseId) {
        return cy.get(`[data-cy="course-catalog-${courseId}-container"]`);
    }

    getCourseCatalogImage(courseId) {
        return cy.get(`[data-cy="course-catalog-${courseId}-image"]`);
    }

    getCourseCatalogContent(courseId) {
        return cy.get(`[data-cy="course-catalog-${courseId}-content"]`);
    }

    getCourseCatalogTitle(courseId) {
        return cy.get(`[data-cy="course-catalog-${courseId}-title"]`);
    }

    getCourseCatalogDescription(courseId) {
        return cy.get(`[data-cy="course-catalog-${courseId}-description"]`);
    }
}
