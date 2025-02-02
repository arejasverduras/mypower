
describe ('Users page', () => {
    it ("should display the users page", () => {
        cy.visit('http://localhost:3000/users')
        cy.contains('users')
    })

    it('should display a list of users', () => {
        cy.visit('http://localhost:3000/users')
        cy.get('.user').should('have.length', 5)
    })
})