// ***********************************************
// Custom Commands for API Testing
// ***********************************************

// Custom command for GET requests
Cypress.Commands.add('apiGet', (endpoint, options = {}) => {
  const defaultOptions = {
    method: 'GET',
    url: endpoint,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    qs: options.qs || {},
    auth: options.auth || undefined,
    failOnStatusCode: false
  }

  return cy.request(defaultOptions)
})

// Custom command for POST requests
Cypress.Commands.add('apiPost', (endpoint, body, options = {}) => {
  const defaultOptions = {
    method: 'POST',
    url: endpoint,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    body: body,
    auth: options.auth || undefined,
    failOnStatusCode: false
  }

  return cy.request(defaultOptions)
})

// Custom command for PUT requests
Cypress.Commands.add('apiPut', (endpoint, body, options = {}) => {
  const defaultOptions = {
    method: 'PUT',
    url: endpoint,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    body: body,
    auth: options.auth || undefined,
    failOnStatusCode: false
  }

  return cy.request(defaultOptions)
})

// Custom command for PATCH requests
Cypress.Commands.add('apiPatch', (endpoint, body, options = {}) => {
  const defaultOptions = {
    method: 'PATCH',
    url: endpoint,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    body: body,
    auth: options.auth || undefined,
    failOnStatusCode: false
  }

  return cy.request(defaultOptions)
})

// Custom command for DELETE requests
Cypress.Commands.add('apiDelete', (endpoint, options = {}) => {
  const defaultOptions = {
    method: 'DELETE',
    url: endpoint,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    auth: options.auth || undefined,
    failOnStatusCode: false
  }

  return cy.request(defaultOptions)
})

// Custom command for Bearer Token authentication
Cypress.Commands.add('bearerAuth', (token) => {
  return {
    bearer: token
  }
})

// Custom command for Basic Auth
Cypress.Commands.add('basicAuth', (username, password) => {
  return {
    username: username,
    password: password
  }
})

// Custom command for API Key authentication (header)
Cypress.Commands.add('apiKeyAuth', (apiKey, headerName = 'x-api-key') => {
  return {
    headers: {
      [headerName]: apiKey
    }
  }
})

// Custom command to validate JSON Schema
Cypress.Commands.add('validateSchema', (response, schema) => {
  const Ajv = require('ajv')
  const ajv = new Ajv({ allErrors: true })
  const validate = ajv.compile(schema)
  const valid = validate(response.body)

  if (!valid) {
    cy.log('Schema validation errors:', JSON.stringify(validate.errors, null, 2))
    throw new Error(`Schema validation failed: ${JSON.stringify(validate.errors)}`)
  }

  return response
})

// Custom command to assert response status
Cypress.Commands.add('assertStatus', (response, expectedStatus) => {
  expect(response.status).to.equal(expectedStatus)
  return response
})

// Custom command to assert response body contains property
Cypress.Commands.add('assertBodyProperty', (response, property, expectedValue) => {
  expect(response.body).to.have.property(property)
  if (expectedValue !== undefined) {
    expect(response.body[property]).to.equal(expectedValue)
  }
  return response
})

// Custom command to assert response headers
Cypress.Commands.add('assertHeader', (response, headerName, expectedValue) => {
  expect(response.headers).to.have.property(headerName.toLowerCase())
  if (expectedValue !== undefined) {
    expect(response.headers[headerName.toLowerCase()]).to.equal(expectedValue)
  }
  return response
})

// Custom command to assert response time
Cypress.Commands.add('assertResponseTime', (response, maxTime) => {
  expect(response.duration).to.be.lessThan(maxTime)
  return response
})

// Custom command to log response details
Cypress.Commands.add('logResponse', (response) => {
  cy.log('Response Status:', response.status)
  cy.log('Response Duration:', response.duration + 'ms')
  cy.log('Response Headers:', JSON.stringify(response.headers, null, 2))
  cy.log('Response Body:', JSON.stringify(response.body, null, 2))
  return response
})

// Custom command for retry logic
Cypress.Commands.add('retryRequest', (requestFn, maxRetries = 3, delay = 1000) => {
  let retries = 0
  
  const attempt = () => {
    return requestFn().then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response
      }
      
      if (retries < maxRetries) {
        retries++
        cy.log(`Retry attempt ${retries}/${maxRetries}`)
        cy.wait(delay)
        return attempt()
      }
      
      return response
    })
  }
  
  return attempt()
})
