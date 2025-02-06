describe ('Exercises page', () => {
    // it ("should display the exercises page", () => {
    //     cy.visit('http://localhost:3000/exercises')
    //     cy.contains('exercises')
    // })
    beforeEach(() => {
        cy.visit('http://localhost:3000/exercises');
    });
   
   
    it('should display a list of exercises', () => {
        // cy.visit('http://localhost:3000/exercises')
        // cy.get('#exercise-list-items').should('exist')
        cy.get('#exercise-list-items').find('div').should('have.length.to.be.greaterThan', 5)

    })

    it ('clicking a list items should display a read more button', () => {
        // cy.visit('http://localhost:3000/exercises')
        cy.get('#exercise-list-items').find('div').first().click()
        cy.get('button').contains('Read more').should('exist')
    })

    it ('clicking a read more button should display the exercise details', () => {
        // cy.visit('http://localhost:3000/exercises')
        cy.get('#exercise-list-items').find('div').first().click()
        cy.get('button').contains('Read more').click()
        cy.contains('Go Back to exercises').should('exist')
    })

    it ('clicking the back button should return to the exercises page', () => {
        // cy.visit('http://localhost:3000/exercises')
        cy.get('#exercise-list-items').find('div').first().click()
        cy.get('button').contains('Read more').click()
        cy.get('button').contains('Go Back to exercises').click()
        cy.contains('exercises').should('exist')
    })

    it('should display a message when there are no exercises', () => {
        cy.intercept('GET', '/api/exercises', { body: [] }).as('getExercises')
        cy.visit('http://localhost:3000/exercises')
        cy.wait('@getExercises')
        cy.contains('No exercises available').should('exist')
    })

    it('should handle API errors gracefully', () => {
        cy.intercept('GET', '/api/exercises', { statusCode: 500 }).as('getExercises')
        cy.visit('http://localhost:3000/exercises')
        cy.wait('@getExercises')
        cy.contains('Failed to load exercises').should('exist')
    })

    // it('gets exercises from /api/exercises', () => {
    //     cy.request('GET', 'http://localhost:3000/api/exercises')
    //     .then((response) => {
    //         expect(response.status).to.eq(200)
    //         expect(response.body.length).to.be.greaterThan(5)
    //     })
    // })
})