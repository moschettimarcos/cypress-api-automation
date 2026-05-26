// ***********************************************************
// This support/e2e.js file is available for:
// - Customizing Cypress configuration
// - Overriding Cypress commands
// - Global before/after hooks
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global before hook - runs once before all tests
before(() => {
  cy.log('Starting API Test Suite')
  cy.log('API URL:', Cypress.env('apiUrl'))
})

// Global after hook - runs once after all tests
after(() => {
  cy.log('API Test Suite Completed')
})

// Global beforeEach hook - runs before each test
beforeEach(() => {
  cy.log('Starting test:', Cypress.currentTest.title)
})

// Global afterEach hook - runs after each test
afterEach(() => {
  cy.log('Test completed:', Cypress.currentTest.title)
})
