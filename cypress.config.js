const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    env: {
      apiUrl: 'https://jsonplaceholder.typicode.com',
      apiVersion: 'v1',
      timeout: 10000,
      retryOnNetworkFailure: true,
      retryOnStatusCodeFailure: false
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results/mochawesome',
      overwrite: false,
      html: true,
      json: true,
      timestamp: 'mmddyyyy_HHMMss'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
