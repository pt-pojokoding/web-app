import { CourseCatalog } from "../selector/contentCourseCatalog"

describe("Course Catalog", () => {
    const courseCatalog = new CourseCatalog()

    beforeEach(() => {
        cy.visit("/katalog-kursus")
        cy.checkLoadingScreenState("visible");
        cy.checkLoadingScreenState("invisible");
    })

    it("All content is visible", () => {
        courseCatalog.getCourseCatalogPageTitle().should("be.visible").should("have.text", "Daftar Kursus")
        courseCatalog.getCourseCatalogLinkAll().should("exist").should("have.length.above", 1)
        courseCatalog.getCourseCatalogLinkAll().first().invoke('attr', 'href').should('match', /^\/kursus\//)
        courseCatalog.getCourseCatalogLinkAll().first().click()
        cy.url().should('include', '/kursus/')
    })
})