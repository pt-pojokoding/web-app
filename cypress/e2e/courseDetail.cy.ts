import { CourseDetailPage } from "../selector/pageCourseDetail";

describe("Course Detail", () => {
    const courseDetailPage = new CourseDetailPage();

    beforeEach(() => {
        cy.visit("/kursus/git-dan-github");
        cy.checkLoadingScreenState("visible");
        cy.checkLoadingScreenState("invisible");
    });

    it("should assert the existence and visibility of all elements", () => {
        courseDetailPage.getTitle().should("exist").and("be.visible");
        courseDetailPage.getShortDescription().should("exist").and("be.visible");
        courseDetailPage.getDescription().should("exist").and("be.visible");
        courseDetailPage.getPrerequisitesTitle().should("exist").and("be.visible");
        courseDetailPage.getPrerequisitesDescription().should("exist").and("be.visible");
        courseDetailPage.getLearningScopeTitle().should("exist").and("be.visible");
        courseDetailPage.getLearningScopeDescription().should("exist").and("be.visible");
        courseDetailPage.getLearningObjectiveTitle().should("exist").and("be.visible");
        courseDetailPage.getLearningObjectiveDescription().should("exist").and("be.visible");
        courseDetailPage.getMaterialTitle().should("exist").and("be.visible");
        courseDetailPage.getMaterialAccordionButton().should("exist").and("be.visible");
        courseDetailPage.getMaterialAccordionTitle().should("exist").and("be.visible");
        courseDetailPage.getImage().should("exist").and("be.visible");
        courseDetailPage.getStartLearningButton().should("exist").and("be.visible");
    });

    it("should interact with the accordion and assert the visibility of accordion elements", () => {
        courseDetailPage.getMaterialAccordionButton().first().click();
        
        courseDetailPage.getMaterialAccordionTitle().should("be.visible");
        courseDetailPage.getMaterialAccordionItemLink().should("be.visible");
        courseDetailPage.getMaterialAccordionItemLinkText().should("be.visible");
    });
    
    it("should navigate to the related article when accordion item link is clicked", () => {
        courseDetailPage.getMaterialAccordionButton().first().click();
        courseDetailPage.getMaterialAccordionItemLink().first().should("be.visible");

        cy.get('[data-cy="course-detail-material-accordion-item-link"]').first().then(($link) => {
            const href = $link.attr('href');

            expect(href).to.not.be.null;
            expect(href).to.not.be.undefined;

            cy.wrap($link).click();

            cy.url().should('eq', Cypress.config('baseUrl') + href!);
        });
    })

    it("should navigate to the first content of the course when 'Mulai belajar' is cliked'", () => {
        courseDetailPage.getStartLearningButton().should("be.visible").click();

        // TODO: should be dynamic
        cy.url().should('eq', Cypress.config('baseUrl') + '/kursus/git-dan-github/pengenalan-git');
    })
});
