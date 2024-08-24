export class ExerciseTextEditor {
    getExerciseCodeEditor() {
        return cy.get('[data-cy="exercise-code-editor"]').find('[role="textbox"]');
    }
}