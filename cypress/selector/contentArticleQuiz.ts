export class Quiz {
    getQuiz() {
        return cy.get('[data-cy="quiz"]');
    }

    getQuizCompleted() {
        return cy.get('[data-cy="quiz-completed"]');
    }

    getQuizCompletedTitle() {
        return cy.get('[data-cy="quiz-completed-title"]');
    }

    getQuizCompletedDescription() {
        return cy.get('[data-cy="quiz-completed-description"]');
    }

    getQuizIntro() {
        return cy.get('[data-cy="quiz-intro"]');
    }

    getQuizIntroTitle() {
        return cy.get('[data-cy="quiz-intro-title"]');
    }

    getQuizIntroQuestionCount() {
        return cy.get('[data-cy="quiz-intro-question-count"]');
    }

    getQuizIntroQuestionCountNumber() {
        return cy.get('[data-cy="quiz-intro-question-count-number"]');
    }

    getQuizIntroStartButton() {
        return cy.get('[data-cy="quiz-intro-start-button"]');
    }

    getQuizStarted() {
        return cy.get('[data-cy="quiz-started"]');
    }

    getQuizCurrentQuestion() {
        return cy.get('[data-cy="quiz-current-question"]');
    }

    getQuizCurrentQuestionTitle() {
        return cy.get('[data-cy="quiz-current-question-title"]');
    }

    getQuizCurrentQuestionChoices() {
        return cy.get('[data-cy="quiz-current-question-choices"]');
    }

    getQuizCurrentQuestionLikeChoice(){
        return cy.get('[data-cy^="quiz-current-question-choice-"]');
    }

    getQuizCurrentQuestionChoice(choiceIndex: number) {
        return cy.get(`[data-cy="quiz-current-question-choice-${choiceIndex}"]`);
    }

    getQuizCurrentQuestionCorrectExplanation() {
        return cy.get('[data-cy="quiz-current-question-correct-explanation"]');
    }

    getQuizCurrentQuestionWrongExplanation() {
        return cy.get('[data-cy="quiz-current-question-wrong-explanation"]');
    }

    getQuizCheckAnswerButton() {
        return cy.get('[data-cy="quiz-check-answer-button"]');
    }

    getQuizNextQuestionButton() {
        return cy.get('[data-cy="quiz-next-question-button"]');
    }

    getQuizFinalCompletion() {
        return cy.get('[data-cy="quiz-final-completion"]');
    }

    getQuizFinalCompletionTitle() {
        return cy.get('[data-cy="quiz-final-completion-title"]');
    }

    getQuizFinalCompletionDescription() {
        return cy.get('[data-cy="quiz-final-completion-description"]');
    }

    getQuizAuth() {
        return cy.get('[data-cy="quiz-auth"]');
    }

    getQuizAuthPrompt() {
        return cy.get('[data-cy="quiz-auth-prompt"]');
    }

    getQuizAuthSignInButton() {
        return cy.get('[data-cy="quiz-auth-signin-button"]');
    }
}
