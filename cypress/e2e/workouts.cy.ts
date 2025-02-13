// /workouts.cy.ts

describe("Library Workouts Page content", () => {
    beforeEach(() => {
      cy.intercept("GET", "http://localhost:3000/api/workouts", { fixture: "workouts.json" }).as("getWorkouts");
      cy.visit("http://localhost:3000/library");
    });
  
    // it("should display the correct workout title", () => {
    //   cy.wait("@getWorkouts");
    //   cy.get("h3").contains("Full Body Strength").should("exist");
    // });
  
    it("should display exercises inside the workout", () => {
      cy.wait("@getWorkouts");
      cy.get("ul").contains("Bench Press").should("exist");
    });
  
    it("should display workout tags", () => {
      cy.wait("@getWorkouts");
      cy.get("p").contains("Strength").should("exist");
      cy.get("p").contains("Full Body").should("exist");
    });
  });
  

describe('Library Workouts component api', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/library');
    });

    it('should display the workouts page', () => {
        cy.contains('Workouts').should('be.visible');
    });

    // it('should display a list of workouts', () => {
    //     cy.get('[data-cy=workout-card]').should('have.length.greaterThan', 0);
    // });
    it('should display a list of workouts', () => {
        cy.intercept('GET', '/api/workouts', { fixture: 'workouts.json' });
        cy.reload();
        cy.get('[data-cy=workout-card]').should('have.length.greaterThan', 0);
    });

    it('should display a message if no workouts are in the list', () => {
        cy.intercept('GET', '/api/workouts', { body: [] });
        cy.reload();
        cy.get('[data-cy=workout-card]').should('not.exist');
        cy.contains('No workouts found').should('be.visible');
    })

    it('should handle errors when fetching workouts', () => {
        cy.intercept('GET', '/api/workouts', {
            statusCode: 500,
            body: 'Internal Server Error',
        });
        cy.reload();
        cy.contains('Failed to load workouts').should('be.visible');
    });


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

