import { Exercise } from "../selector/contentExercise";
import { ExerciseTestCase } from "../selector/contentExerciseTestCase";
import { ExerciseTextEditor } from "../selector/contentExerciseCodeEditor";
import { SidebarContents } from "../selector/contentSidebarContents";

describe("Exercise logged in", () => {
    const exercise = new Exercise();
    const exerciseTestCase = new ExerciseTestCase();
    const exerciseTextEditor = new ExerciseTextEditor();
    const sidebarContents = new SidebarContents();

    beforeEach(() => {
        cy.login();
        cy.visit(`/kursus/${Cypress.env("TEST_COURSE_SLUG")}/${Cypress.env("TEST_EXERCISE_SLUG")}`);
    });

    it("Shows All Content Before Exercise", () => {
        exercise.getExerciseTitle().should("exist").and("be.visible");
        exercise.getExerciseQuestionTitle().should("exist").and("be.visible");
        exercise.getExerciseQuestionContent().should("exist").and("be.visible");
        exercise.getExerciseTestCasesTitle().should("exist").and("be.visible");

        exerciseTestCase.getExerciseTestCaseButton().first().click();

        exerciseTestCase.getExerciseTestCaseDetailDescriptionContent().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseDetailExpectedOutputTitle().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseDetailExpectedOutputContent().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseDetailInputTitle().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseDetailInputContent().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseDetailObtainedOutputTitle().should("not.exist");
        exerciseTestCase.getExerciseTestCaseDetailObtainedOutputContent().should("not.exist");

        exercise.getExerciseCheckAnswerButton().should("exist").and("be.visible");

        exerciseTextEditor.getExerciseCodeEditor().should("exist").and("be.visible");
    });

    const correctCode = `function greet(name){
	    console.log("Halo", name)
   `;

    const partialyCorrectCode = `function greet(name){
        console.log("Halo Joni")
    `;

    const wrongCode = `function greet(name){
        console.log("kopi sesat")
    `;

    const wrongSyntaxCode = `function greet(name){
        console.log(", name)
    `;

    it("Partialy Correct Answer", () => {
        exerciseTextEditor.getExerciseCodeEditor().click().type("{ctrl}a").type("{del}").type(partialyCorrectCode);

        exercise.getExerciseCheckAnswerButton().click();

        exerciseTestCase.getExerciseTestCaseLoadingIcon().should("exist").and("be.visible");

        cy.wait(4000);
        exerciseTestCase.getExerciseTestCaseLoadingIcon().should("not.exist");

        exerciseTestCase.getExerciseTestCaseButton().first().click();

        exerciseTestCase.getExerciseTestCaseDetailObtainedOutputTitle().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseDetailObtainedOutputContent().should("exist").and("be.visible");

        exerciseTestCase.getExerciseTestCaseSuccessIcon().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseSuccessIcon().should("have.length", 1);

        exerciseTestCase.getExerciseTestCaseFailedIcon().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseFailedIcon().should("have.length", 1);
    });

    it("Wrong Answer no Syntax Error", () => {
        exerciseTextEditor.getExerciseCodeEditor().click().type("{ctrl}a").type("{del}").type(wrongCode);

        exercise.getExerciseCheckAnswerButton().click();

        exerciseTestCase.getExerciseTestCaseLoadingIcon().should("exist").and("be.visible");
        cy.wait(4000);
        exerciseTestCase.getExerciseTestCaseLoadingIcon().should("not.exist");

        exerciseTestCase.getExerciseTestCaseButton().first().click();

        exerciseTestCase.getExerciseTestCaseDetailObtainedOutputTitle().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseDetailObtainedOutputContent().should("exist").and("be.visible");

        exerciseTestCase.getExerciseTestCaseFailedIcon().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseFailedIcon().should("have.length", 2);
    });

    it("Wrong Answer with Syntax Error", () => {
        exerciseTextEditor.getExerciseCodeEditor().click().type("{ctrl}a").type("{del}").type(wrongSyntaxCode);

        exercise.getExerciseCheckAnswerButton().click();

        exerciseTestCase.getExerciseTestCaseLoadingIcon().should("exist").and("be.visible");
        cy.wait(4000);
        exerciseTestCase.getExerciseTestCaseLoadingIcon().should("not.exist");

        exerciseTestCase.getExerciseTestCaseButton().first().click();

        exerciseTestCase.getExerciseTestCaseDetailObtainedOutputTitle().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseDetailObtainedOutputContent().should("exist").and("be.visible");

        exerciseTestCase.getExerciseTestCaseFailedIcon().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseFailedIcon().should("have.length", 2);
    });

    it("Correct Answer", () => {
        exerciseTextEditor.getExerciseCodeEditor().click().type("{ctrl}a").type("{del}").type(correctCode);

        exercise.getExerciseCheckAnswerButton().click();

        exerciseTestCase.getExerciseTestCaseLoadingIcon().should("exist").and("be.visible");
        cy.wait(4000);
        exerciseTestCase.getExerciseTestCaseLoadingIcon().should("not.exist");

        exerciseTestCase.getExerciseTestCaseButton().first().click();

        exerciseTestCase.getExerciseTestCaseDetailObtainedOutputTitle().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseDetailObtainedOutputContent().should("exist").and("be.visible");

        exerciseTestCase.getExerciseTestCaseSuccessIcon().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseSuccessIcon().should("have.length", 2);
    });

    it("Revisit Exercise after finishing", () => {
        sidebarContents
            .getSidebarContentLink(Cypress.env("TEST_EXERCISE_ID"))
            .find('[data-cy="sidebar-content-completed-icon"]')
            .should("exist")
            .and("be.visible");

        exerciseTestCase.getExerciseTestCaseSuccessIcon().should("exist").and("be.visible");
        exerciseTestCase.getExerciseTestCaseSuccessIcon().should("have.length", 2);

        cy.callFirestore("delete", "progress", {
            where: [
                ["userId", "==", Cypress.env("TEST_UID")],
                ["courseId", "==", Cypress.env("TEST_COURSE_ID")],
                ["contentId", "==", Cypress.env("TEST_EXERCISE_ID")],
            ],
        }).then(() => {
            cy.log("Progress deleted");
        });
    });
});

describe("Exercise not logged in", () => {
    it("Redirect to homepage", () => {
        cy.logout();
        cy.visit(`/kursus/${Cypress.env("TEST_COURSE_SLUG")}/${Cypress.env("TEST_EXERCISE_SLUG")}`);
        cy.location("pathname").should("eq", `/`);
    });
});
