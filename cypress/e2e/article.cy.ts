import { ContentPage } from "../selector/contentArticle";
import { ArticleMarkdown } from "../selector/contentArticleMarkdownRenderer";
import { Quiz } from "../selector/contentArticleQuiz";
import { SidebarContents } from "../selector/contentSidebarContents";

describe("Article", () => {
    const contentPage = new ContentPage();
    const articleMarkdown = new ArticleMarkdown();
    const quiz = new Quiz();
    const sidebarContents = new SidebarContents();

    beforeEach(() => {
        cy.visit("http://localhost:3000/kursus/git-dan-github/pengenalan-git");
    });

    it("Should show the article", () => {
        contentPage.getArticleTitle().should("exist").and("be.visible");
        articleMarkdown.getArticleMarkdownContent().should("exist").and("be.visible");
    });

    it("Should show the quiz intro", () => {
        cy.login();

        quiz.getQuizIntro().should("exist").and("be.visible");
        quiz.getQuizIntroTitle().should("exist").and("be.visible");
        quiz.getQuizIntroQuestionCount().should("exist").and("be.visible");
        quiz.getQuizIntroStartButton().should("exist").and("be.visible");
    });

    it("Complete the quiz", () => {
        function quizCompleted() {
            quiz.getQuizFinalCompletion().should("exist").and("be.visible");
            quiz.getQuizFinalCompletionTitle().should("exist").and("be.visible");
            quiz.getQuizFinalCompletionDescription().should("exist").and("be.visible");

            cy.wait(1000);

            cy.callFirestore("get", "progress", {
                where: [
                    ["userId", "==", Cypress.env("TEST_UID")],
                    ["courseId", "==", Cypress.env("TEST_COURSE_ID")],
                    ["contentId", "==", Cypress.env("TEST_CONTENT_ID")],
                ],
            }).then((response) => {
                const progress = response[0];
                cy.log("Progress: ", progress);

                expect(progress).to.have.property("contentType").to.be.eq("post");
            });

            sidebarContents
                .getSidebarContentLink(Cypress.env("TEST_CONTENT_ID"))
                .find('[data-cy="sidebar-content-completed-icon"]')
                .should("exist")
                .and("be.visible");
        }

        quiz.getQuizIntroQuestionCountNumber()
            .should("exist")
            .and("be.visible")
            .then(($el) => {
                quiz.getQuizIntroStartButton().click();
                quiz.getQuizStarted().should("exist").and("be.visible");

                const questionCount = parseInt($el.text());
                cy.log("Question count: ", questionCount);

                function processChoices(currentQuestionIndex: number) {
                    if (currentQuestionIndex >= questionCount) {
                        quizCompleted();
                        return;
                    }

                    cy.log("Current question number: ", currentQuestionIndex + 1);

                    quiz.getQuizCurrentQuestionLikeChoice()
                        .should("exist")
                        .and("be.visible")
                        .then(($choices) => {
                            const numberOfChoices = $choices.length;
                            cy.log("Number of choices: ", numberOfChoices);

                            function checkChoice(currentChoiceIndex: number) {
                                if (currentChoiceIndex >= numberOfChoices) {
                                    processChoices(currentQuestionIndex + 1);
                                    return;
                                }

                                quiz.getQuizCurrentQuestionChoice(currentChoiceIndex).click();
                                quiz.getQuizCheckAnswerButton().click();

                                cy.wait(500);

                                cy.get("body").then(($body) => {
                                    if ($body.find('[data-cy="quiz-current-question-correct-explanation"]').length) {
                                        quiz.getQuizCurrentQuestionCorrectExplanation().then(($correctExplanation) => {
                                            if ($correctExplanation.is(":visible")) {
                                                cy.log("Is choice correct: true");
                                                quiz.getQuizNextQuestionButton().click();
                                                processChoices(currentQuestionIndex + 1);
                                            } else {
                                                checkWrongExplanation(currentChoiceIndex);
                                            }
                                        });
                                    } else {
                                        checkWrongExplanation(currentChoiceIndex);
                                    }
                                });
                            }

                            function checkWrongExplanation(currentChoiceIndex: number) {
                                cy.get("body").then(($body) => {
                                    if ($body.find('[data-cy="quiz-current-question-wrong-explanation"]').length) {
                                        quiz.getQuizCurrentQuestionWrongExplanation().then(($wrongExplanation) => {
                                            if ($wrongExplanation.is(":visible")) {
                                                cy.log("Is choice correct: false");
                                                checkChoice(currentChoiceIndex + 1);
                                            } else {
                                                checkChoice(currentChoiceIndex);
                                            }
                                        });
                                    } else {
                                        checkChoice(currentChoiceIndex);
                                    }
                                });
                            }

                            checkChoice(0);
                        });
                }

                processChoices(0);
            });
    });

    it("Should show completed state of quiz", () => {
        sidebarContents
            .getSidebarContentLink(Cypress.env("TEST_CONTENT_ID"))
            .find('[data-cy="sidebar-content-completed-icon"]')
            .should("exist")
            .and("be.visible");

        quiz.getQuizCompleted().should("exist").and("be.visible");
        quiz.getQuizCompletedTitle().should("exist").and("be.visible");
        quiz.getQuizCompletedDescription().should("exist").and("be.visible");

        cy.callFirestore("delete", "progress", {
            where: [
                ["userId", "==", Cypress.env("TEST_UID")],
                ["courseId", "==", Cypress.env("TEST_COURSE_ID")],
                ["contentId", "==", Cypress.env("TEST_CONTENT_ID")],
            ],
        }).then(() => {
            cy.log("Progress deleted");
        });
    });

    it("Should show login button when user is not logged in", () => {
        cy.logout();

        quiz.getQuizAuth().should("exist").and("be.visible");
        quiz.getQuizAuthPrompt().should("exist").and("be.visible");
        quiz.getQuizAuthSignInButton().should("exist").and("be.visible");
    });

    it("Should lock the exercise page when user is not logged in", () => {
        cy.wait(1000)
        sidebarContents.getSidebarContentLink(Cypress.env("TEST_EXERCISE_ID")).find('[data-cy="sidebar-content-not-completed-button"]').should('be.disabled')
        sidebarContents.getSidebarContentLink(Cypress.env("TEST_EXERCISE_ID")).find('[data-cy="sidebar-content-not-completed-button-locked-icon"]').should('exist').and('be.visible')
    });
});
