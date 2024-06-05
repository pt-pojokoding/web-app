class ExerciseTestCasePage {
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

    getExerciseTestCaseDetails() {
        return cy.get('[data-cy="exercise-test-case-details"]');
    }

    getExerciseTestCaseDescriptionTitle() {
        return cy.get('[data-cy="exercise-test-case-description-title"]');
    }

    getExerciseTestCaseDescriptionContent() {
        return cy.get('[data-cy="exercise-test-case-description-content"]');
    }

    getExerciseTestCaseInputTitle() {
        return cy.get('[data-cy="exercise-test-case-input-title"]');
    }

    getExerciseTestCaseInputContent() {
        return cy.get('[data-cy="exercise-test-case-input-content"]');
    }

    getExerciseTestCaseExpectedOutputTitle() {
        return cy.get('[data-cy="exercise-test-case-expected-output-title"]');
    }

    getExerciseTestCaseExpectedOutputContent() {
        return cy.get('[data-cy="exercise-test-case-expected-output-content"]');
    }

    getExerciseTestCaseObtainedOutputTitle() {
        return cy.get('[data-cy="exercise-test-case-obtained-output-title"]');
    }

    getExerciseTestCaseObtainedOutputContent() {
        return cy.get('[data-cy="exercise-test-case-obtained-output-content"]');
    }
}
