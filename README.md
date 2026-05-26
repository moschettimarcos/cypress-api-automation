# Cypress API Automation Framework

A professional and comprehensive API automation framework built with Cypress, covering all HTTP methods, authentication strategies, schema validation, and error handling best practices.

## 🚀 Features

- **Complete HTTP Methods Coverage**: GET, POST, PUT, PATCH, DELETE
- **Authentication Strategies**: Bearer Token, Basic Auth, API Key, OAuth 2.0, JWT
- **Schema Validation**: JSON Schema validation using AJV
- **Error Handling**: Comprehensive 4xx and 5xx error scenarios
- **Custom Commands**: Reusable API commands for cleaner tests
- **Fixtures & Data Management**: Organized test data and schemas
- **Environment Configuration**: Multi-environment support
- **Professional Reporting**: Mochawesome reports with detailed test results
- **Best Practices**: Following industry standards for API testing

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Basic knowledge of JavaScript and REST APIs

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd cypress-api-automation
```

2. Install dependencies:
```bash
npm install
```

3. Open Cypress:
```bash
npm run cypress:open
```

## 📁 Project Structure

```
cypress-api-automation/
├── cypress/
│   ├── e2e/
│   │   └── api/
│   │       ├── auth/
│   │       │   └── authentication.cy.js
│   │       ├── delete/
│   │       │   └── deleteRequests.cy.js
│   │       ├── errors/
│   │       │   └── errorHandling.cy.js
│   │       ├── get/
│   │       │   └── getRequests.cy.js
│   │       ├── patch/
│   │       │   └── patchRequests.cy.js
│   │       ├── post/
│   │       │   └── postRequests.cy.js
│   │       ├── put/
│   │       │   └── putRequests.cy.js
│   │       └── validation/
│   │           └── schemaValidation.cy.js
│   ├── fixtures/
│   │   ├── schemas/
│   │   │   ├── postSchema.json
│   │   │   └── userSchema.json
│   │   ├── comment.json
│   │   ├── post.json
│   │   ├── todo.json
│   │   └── user.json
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   └── results/
│       └── mochawesome/
├── cypress.config.js
├── cypress.env.json
├── package.json
└── README.md
```

## ⚙️ Configuration

### Environment Variables

Edit `cypress.env.json` to configure your API endpoints and authentication:

```json
{
  "apiUrl": "https://jsonplaceholder.typicode.com",
  "apiVersion": "v1",
  "timeout": 10000,
  "auth": {
    "bearerToken": "your-bearer-token-here",
    "apiKey": "your-api-key-here",
    "basicAuth": {
      "username": "test-user",
      "password": "test-password"
    }
  }
}
```

### Cypress Configuration

The `cypress.config.js` file contains all Cypress-specific settings:

- Base URL
- Test file patterns
- Timeouts
- Reporter configuration
- Environment variables

## 🧪 Running Tests

### Run all tests in headless mode:
```bash
npm test
```

### Run tests with Cypress UI:
```bash
npm run cypress:open
```

### Run tests in specific browser:
```bash
npm run test:chrome
npm run test:edge
```

### Run tests with recording:
```bash
npm run test:record
```

### Generate and view reports:
```bash
npm run report:merge
npm run report:generate
```

## 📚 Test Suites

### 1. GET Requests (`cypress/e2e/api/get/getRequests.cy.js`)

- Basic GET requests
- Single resource retrieval
- Query parameters
- Custom headers
- Response validation
- Performance testing
- Edge cases

### 2. POST Requests (`cypress/e2e/api/post/postRequests.cy.js`)

- Create new resources
- Using fixture data
- Field validation
- Data type handling
- Special characters
- Large data handling
- Array data

### 3. PUT Requests (`cypress/e2e/api/put/putRequests.cy.js`)

- Complete resource updates
- Partial updates
- Non-existent resources
- Data type changes
- Null and empty values
- Response validation
- Concurrent updates

### 4. PATCH Requests (`cypress/e2e/api/patch/patchRequests.cy.js`)

- Partial resource updates
- Multiple field updates
- Nested object updates
- Data type changes
- Special characters
- Sequential updates
- Comparison with PUT

### 5. DELETE Requests (`cypress/e2e/api/delete/deleteRequests.cy.js`)

- Resource deletion
- Non-existent resources
- Response validation
- Verification workflows
- Idempotency
- Create and delete workflows
- Cascade delete concepts

### 6. Authentication (`cypress/e2e/api/auth/authentication.cy.js`)

- Bearer Token authentication
- Basic Authentication
- API Key authentication
- OAuth 2.0 concepts
- JWT authentication concepts
- Session/Cookie authentication
- Best practices
- Multi-factor authentication concepts

### 7. Schema Validation (`cypress/e2e/api/validation/schemaValidation.cy.js`)

- User schema validation
- Post schema validation
- Comment schema validation
- Todo schema validation
- Nested object validation
- Array validation
- Custom schema validation
- Response format validation

### 8. Error Handling (`cypress/e2e/api/errors/errorHandling.cy.js`)

- 4xx client errors (400, 401, 403, 404, 405, 409, 422, 429)
- 5xx server errors (500, 502, 503, 504)
- Error response structure
- Invalid data handling
- Network error handling
- Retry logic
- Error logging and reporting
- Graceful degradation
- Error recovery

## 🔧 Custom Commands

The framework includes reusable custom commands in `cypress/support/commands.js`:

### API Request Commands

- `cy.apiGet(endpoint, options)` - GET requests
- `cy.apiPost(endpoint, body, options)` - POST requests
- `cy.apiPut(endpoint, body, options)` - PUT requests
- `cy.apiPatch(endpoint, body, options)` - PATCH requests
- `cy.apiDelete(endpoint, options)` - DELETE requests

### Authentication Commands

- `cy.bearerAuth(token)` - Bearer token authentication
- `cy.basicAuth(username, password)` - Basic authentication
- `cy.apiKeyAuth(apiKey, headerName)` - API key authentication

### Validation Commands

- `cy.validateSchema(response, schema)` - JSON schema validation
- `cy.assertStatus(response, expectedStatus)` - Status code assertion
- `cy.assertBodyProperty(response, property, expectedValue)` - Body property assertion
- `cy.assertHeader(response, headerName, expectedValue)` - Header assertion
- `cy.assertResponseTime(response, maxTime)` - Response time assertion

### Utility Commands

- `cy.logResponse(response)` - Log response details
- `cy.retryRequest(requestFn, maxRetries, delay)` - Retry failed requests

## 📊 Reporting

The framework uses Mochawesome for generating detailed HTML reports:

- Test execution summary
- Pass/fail statistics
- Detailed test results
- Screenshots on failure
- Timestamped reports

Reports are generated in `cypress/results/mochawesome/`

## 🎯 Best Practices Implemented

1. **Page Object Model**: Custom commands for reusable API operations
2. **Data-Driven Testing**: Fixtures for test data separation
3. **Environment Configuration**: Separate configs for different environments
4. **Error Handling**: Comprehensive error scenario coverage
5. **Schema Validation**: JSON Schema validation for response integrity
6. **Authentication**: Multiple authentication strategies
7. **Reporting**: Detailed test reports with Mochawesome
8. **Code Organization**: Logical file structure and naming conventions
9. **Documentation**: Inline comments and comprehensive README
10. **Security**: Credentials stored in environment variables

## 🔐 Security Considerations

- Never hardcode credentials in test files
- Use environment variables for sensitive data
- Don't commit `.env` files to version control
- Rotate API keys and tokens regularly
- Use different credentials for different environments

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Cypress](https://www.cypress.io/) - Testing framework
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake REST API for testing
- [Mochawesome](https://github.com/adamgruber/mochawesome) - Reporting
- [AJV](https://github.com/ajv-validator/ajv) - JSON Schema validation

## 📞 Contact

For questions or suggestions, please open an issue in the repository.

---

**Note**: This framework uses JSONPlaceholder as a test API. In production, replace the `apiUrl` in `cypress.env.json` with your actual API endpoint.
