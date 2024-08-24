export class Navbar {
    getNavbarLogo() {
        return cy.get('[data-cy="navbar-logo"]');
    }

    getNavbarCatalogCourseDesktop() {
        return cy.get('[data-cy="navbar-catalog-course-desktop"]');
    }

    getNavbarDashboardDesktop() {
        return cy.get('[data-cy="navbar-dashboard-desktop"]');
    }

    getNavbarDropdownHamburger() {
        return cy.get('[data-cy="navbar-dropdown-hamburger"]');
    }

    getColorModeToggle() {
        return cy.get('[data-cy="color-mode-toggle"]');
    }

    getNavbarDropdownAvatar() {
        return cy.get('[data-cy="navbar-dropdown-avatar"]');
    }

    getNavbarDropdownLoggedInAsText() {
        return cy.get('[data-cy="navbar-dropdown-logged-in-as-text"]');
    }

    getNavbarDropdownLoggedInAsUsername() {
        return cy.get('[data-cy="navbar-dropdown-logged-in-as-username"]');
    }

    getNavbarDropdownAccountInfo() {
        return cy.get('[data-cy="navbar-dropdown-account-info"]');
    }

    getNavbarDropdownCourseCatalog() {
        return cy.get('[data-cy="navbar-dropdown-course-catalog"]');
    }

    getNavbarDropdownLogout() {
        return cy.get('[data-cy="navbar-dropdown-logout"]');
    }

    getGoogleLoginButton() {
        return cy.get('[data-cy="google-login-button"]');
    }
}
