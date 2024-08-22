export class CourseDetailPage {
    getTitle() {
        return cy.get('[data-cy="course-detail-title"]');
    }

    getShortDescription() {
        return cy.get('[data-cy="course-detail-shortDescription"]');
    }

    getDescription() {
        return cy.get('[data-cy="course-detail-description"]');
    }

    getPrerequisitesTitle() {
        return cy.get('[data-cy="course-detail-prerequisites-title"]');
    }

    getPrerequisitesDescription() {
        return cy.get('[data-cy="course-detail-prerequisites-description"]');
    }

    getLearningScopeTitle() {
        return cy.get('[data-cy="course-detail-learning-scope-title"]');
    }

    getLearningScopeDescription() {
        return cy.get('[data-cy="course-detail-learning-scope-description"]');
    }

    getLearningObjectiveTitle() {
        return cy.get('[data-cy="course-detail-learning-objective-title"]');
    }

    getLearningObjectiveDescription() {
        return cy.get('[data-cy="course-detail-learning-objective-description"]');
    }

    getMaterialTitle() {
        return cy.get('[data-cy="course-detail-material-title"]');
    }

    getMaterialAccordionButton() {
        return cy.get('[data-cy="course-detail-material-accordion-button"]');
    }

    getMaterialAccordionTitle() {
        return cy.get('[data-cy="course-detail-material-accordion-title"]');
    }

    getMaterialAccordionItemLink() {
        return cy.get('[data-cy="course-detail-material-accordion-item-link"]');
    }

    getMaterialAccordionItemLinkText() {
        return cy.get('[data-cy="course-detail-material-accordion-item-link-text"]');
    }

    getImage() {
        return cy.get('[data-cy="course-detail-image"]');
    }

    getStartLearningButton() {
        return cy.get('[data-cy="course-detail-start-learning-button"]');
    }
}
