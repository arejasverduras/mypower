// /workouts.cy.ts


describe('Workouts Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/workouts');
    });

    it('should display the workouts page', () => {
        cy.contains('Workouts').should('be.visible');
    });

    it('should display a list of workouts', () => {
        cy.get('[data-cy=workout-card]').should('have.length.greaterThan', 0);
    });

    it('should display a message if no workouts are in the list', () => {
        cy.get('[data-cy=workout-card]').should('not.exist');
        cy.contains('No workouts found').should('be.visible');
    })


    // it('should allow users to create a workout', () => {
    //     cy.get('[data-cy=create-workout-button]').click();
    //     cy.get('[data-cy=workout-name-input]').type('Morning Routine');
    //     cy.get('[data-cy=exercise-select]').select('Push-ups');
    //     cy.get('[data-cy=add-exercise-button]').click();
    //     cy.get('[data-cy=save-workout-button]').click();
    //     cy.contains('Morning Routine').should('be.visible');
    // });

    // it('should allow users to search for workouts', () => {
    //     cy.get('[data-cy=search-input]').type('Morning Routine');
    //     cy.get('[data-cy=search-button]').click();
    //     cy.contains('Morning Routine').should('be.visible');
    // });

    // it('should allow users to follow a workout', () => {
    //     cy.get('[data-cy=search-input]').type('Morning Routine');
    //     cy.get('[data-cy=search-button]').click();
    //     cy.contains('Morning Routine').parent().find('[data-cy=follow-button]').click();
    //     cy.contains('Following').should('be.visible');
    // });
});