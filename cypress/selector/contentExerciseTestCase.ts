export class ExerciseTestCase {
    getExerciseTestCase() {
        return cy.get('[data-cy="exercise-test-case"]');
    }

    getExerciseTestCaseButton() {
        return cy.get('[data-cy="exercise-test-case-button"]');
    }

    getExerciseTestCaseButtonContent() {
        return cy.get('[data-cy="exercise-test-case-button-content"]');
    }

    getExerciseTestCaseTitle() {
        return cy.get('[data-cy="exercise-test-case-title"]');
    }

    getExerciseTestCaseStatusIcons() {
        return cy.get('[data-cy="exercise-test-case-status-icons"]');
    }

    getExerciseTestCaseSuccessIcon() {
        return cy.get('[data-cy="exercise-test-case-success-icon"]');
    }

    getExerciseTestCaseFailedIcon() {
        return cy.get('[data-cy="exercise-test-case-failed-icon"]');
    }

    getExerciseTestCaseLoadingIcon() {
        return cy.get('[data-cy="exercise-test-case-loading-icon"]');
    }

    getExerciseTestCaseToggleIcon() {
        return cy.get('[data-cy="exercise-test-case-toggle-icon"]');
    }

    getExerciseTestCaseDetail() {
        return cy.get('[data-cy="exercise-test-case-detail"]');
    }

    getExerciseTestCaseDetailDescriptionContent() {
        return cy.get('[data-cy="exercise-test-case-detail-description"]');
    }

    getExerciseTestCaseDetailInputTitle() {
        return cy.get('[data-cy="exercise-test-case-detail-input-title"]');
    }

    getExerciseTestCaseDetailInputContent() {
        return cy.get('[data-cy="exercise-test-case-detail-input-content"]');
    }

    getExerciseTestCaseDetailExpectedOutputTitle() {
        return cy.get('[data-cy="exercise-test-case-detail-expected-output-title"]');
    }

    getExerciseTestCaseDetailExpectedOutputContent() {
        return cy.get('[data-cy="exercise-test-case-detail-expected-output-content"]');
    }

    getExerciseTestCaseDetailObtainedOutputTitle() {
        return cy.get('[data-cy="exercise-test-case-detail-obtained-output-title"]');
    }

    getExerciseTestCaseDetailObtainedOutputContent() {
        return cy.get('[data-cy="exercise-test-case-detail-obtained-output-content"]');
    }
}
