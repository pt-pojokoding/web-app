import { HomepageHeader } from "../selector/homepageHeader";
import { HomepageListOfCourses } from "../selector/homepageListOfCourses";
import { CourseCatalog } from "../selector/contentCourseCatalog";

describe("Homepage", () => {
    const homepageHeader = new HomepageHeader();
    const homepageListOfCourses = new HomepageListOfCourses();
    const courseCatalog = new CourseCatalog();

    beforeEach(() => {
        cy.login();
        cy.visit("/");
        cy.checkLoadingScreenState("visible");
        cy.checkLoadingScreenState("invisible");
    });

    it("All content is visible", () => {
        homepageHeader.getHeaderTitle().should("be.visible");
        homepageHeader.getHeaderLookCourseListButton().should("be.visible");

        homepageHeader.getHeaderLookCourseListButton().click();

        homepageListOfCourses.getHomepageListOfCoursesTitle().should("be.visible");

        courseCatalog.getCourseCatalogLinkAll().should("exist").should("have.length.at.most", 6);
    });
});
