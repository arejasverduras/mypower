describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('first test', () => {
  it('visit host', () => {
    cy.visit('http://localhost:3000')
  })
})