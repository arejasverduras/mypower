// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

// describe('first test', () => {
//   it('visit host', () => {
//     cy.visit('http://localhost:3000')
//   })
// })

describe('get test', () => {
  it('gets exercises from /api/exercises', () => {
    cy.request('GET', 'http://localhost:3000/api/exercises')
  })
})