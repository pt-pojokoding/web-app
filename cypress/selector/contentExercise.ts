export class Exercise {
    getExercise() {
        return cy.get('[data-cy="exercise"]');
    }

    getExerciseLeftPanel() {
        return cy.get('[data-cy="exercise-left-panel"]');
    }

    getExerciseLeftContent() {
        return cy.get('[data-cy="exercise-left-content"]');
    }

    getExerciseTitle() {
        return cy.get('[data-cy="exercise-title"]');
    }

    getExerciseQuestion() {
        return cy.get('[data-cy="exercise-question"]');
    }

    getExerciseQuestionTitle() {
        return cy.get('[data-cy="exercise-question-title"]');
    }

    getExerciseQuestionContent() {
        return cy.get('[data-cy="exercise-question-content"]');
    }

    getExerciseTestCases() {
        return cy.get('[data-cy="exercise-test-cases"]');
    }

    getExerciseTestCasesTitle() {
        return cy.get('[data-cy="exercise-test-cases-title"]');
    }

    getExerciseTestCasesContent() {
        return cy.get('[data-cy="exercise-test-cases-wrapper"]');
    }    

    getExerciseStickyBottom() {
        return cy.get('[data-cy="exercise-sticky-bottom"]');
    }

    getExerciseCheckAnswerButton() {
        return cy.get('[data-cy="exercise-check-answer-button"]');
    }

    getExerciseRightPanel() {
        return cy.get('[data-cy="exercise-right-panel"]');
    }
}
