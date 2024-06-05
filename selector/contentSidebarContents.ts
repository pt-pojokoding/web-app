class SidebarPage {
    getSidebar() {
        return cy.get('[data-cy="sidebar"]');
    }

    getSidebarContent() {
        return cy.get('[data-cy="sidebar-content"]');
    }

    getSidebarSubcourseTitle() {
        return cy.get('[data-cy="sidebar-subcourse-title"]');
    }

    getSidebarContentLink() {
        return cy.get('[data-cy="sidebar-content-link"]');
    }

    getSidebarContentCompletedButton() {
        return cy.get('[data-cy="sidebar-content-completed-button"]');
    }

    getSidebarContentCompletedIcon() {
        return cy.get('[data-cy="sidebar-content-completed-icon"]');
    }

    getSidebarContentTitle() {
        return cy.get('[data-cy="sidebar-content-title"]');
    }

    getSidebarContentPendingButton() {
        return cy.get('[data-cy="sidebar-content-pending-button"]');
    }

    getSidebarContentLockedIcon() {
        return cy.get('[data-cy="sidebar-content-locked-icon"]');
    }
}
