export class LoadingScreen {
    getLoadingScreenText(){
        return cy.get('[data-cy="loading-text"]');
    }

    getLoadingScreenSpinner(){
        return cy.get('[data-cy="loading-spinner"]');
    }
}