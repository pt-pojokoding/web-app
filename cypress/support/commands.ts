import { LoadingScreen } from "../selector/UiLoadingScreen";

declare global {
    namespace Cypress {
        interface Chainable {
            checkLoadingScreenState(state: "visible" | "invisible"): Chainable<Element>;
        }
    }
}

Cypress.Commands.add("checkLoadingScreenState", (state: "visible" | "invisible") => {
    const loadingScreen = new LoadingScreen();

    if (state === "visible") {
        loadingScreen.getLoadingScreenText().should("be.visible");
        loadingScreen.getLoadingScreenSpinner().should("be.visible");
    } else if (state === "invisible") {
        loadingScreen.getLoadingScreenText().should("not.exist");
        loadingScreen.getLoadingScreenSpinner().should("not.exist");
    }
})
