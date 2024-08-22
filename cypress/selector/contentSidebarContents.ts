export class SidebarContents {
    getSidebar() {
        return cy.get('[data-cy="sidebar"]');
    }

    getSidebarContent() {
        return cy.get('[data-cy="sidebar-content"]');
    }

    getSidebarSubcourseTitle() {
        return cy.get('[data-cy="sidebar-subcourse-title"]');
    }

    getSidebarContentLinkLike() {
        return cy.get('[data-cy^="sidebar-content-link-"]');
    }

    getSidebarContentLink(contentId: number) {
        return cy.get(`[data-cy="sidebar-content-link-${contentId}"]`);
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

    getSidebarContentNotCompletedButton() {
        return cy.get('[data-cy="sidebar-content-not-completed-button"]');
    }

    getSidebarContentNotCompletedLockedIcon() {
        return cy.get('[data-cy="sidebar-content-not-completed-locked-icon"]');
    }

    getSidebarContentNotCompletedButtonTitle() {
        return cy.get('[data-cy="sidebar-content-not-completed-button-title"]');
    }
}
    