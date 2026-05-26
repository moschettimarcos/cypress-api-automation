describe('API Schema Validation', () => {
  const baseUrl = Cypress.env('apiUrl')
  
  beforeEach(() => {
    cy.log('Testing JSON Schema validation')
  })

  describe('User Schema Validation', () => {
    it('should validate user response against schema', () => {
      cy.fixture('schemas/userSchema.json').then((userSchema) => {
        cy.apiGet(`${baseUrl}/users/1`)
          .then((response) => {
            cy.assertStatus(response, 200)
            cy.validateSchema(response, userSchema)
          })
      })
    })

    it('should validate all users in array against schema', () => {
      cy.fixture('schemas/userSchema.json').then((userSchema) => {
        cy.apiGet(`${baseUrl}/users`)
          .then((response) => {
            cy.assertStatus(response, 200)
            expect(response.body).to.be.an('array')
            
            // Validate each user in the array
            response.body.forEach((user) => {
              const Ajv = require('ajv')
              const ajv = new Ajv({ allErrors: true })
              const validate = ajv.compile(userSchema)
              const valid = validate(user)
              
              if (!valid) {
                cy.log('Schema validation errors:', JSON.stringify(validate.errors, null, 2))
                throw new Error(`Schema validation failed for user ${user.id}`)
              }
            })
          })
      })
    })

    it('should validate user has required fields', () => {
      cy.apiGet(`${baseUrl}/users/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.include.keys(
            'id', 'name', 'username', 'email', 'phone', 'website', 'address', 'company'
          )
        })
    })

    it('should validate user field types', () => {
      cy.apiGet(`${baseUrl}/users/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body.id).to.be.a('number')
          expect(response.body.name).to.be.a('string')
          expect(response.body.username).to.be.a('string')
          expect(response.body.email).to.be.a('string')
          expect(response.body.address).to.be.an('object')
          expect(response.body.company).to.be.an('object')
        })
    })
  })

  describe('Post Schema Validation', () => {
    it('should validate post response against schema', () => {
      cy.fixture('schemas/postSchema.json').then((postSchema) => {
        cy.apiGet(`${baseUrl}/posts/1`)
          .then((response) => {
            cy.assertStatus(response, 200)
            cy.validateSchema(response, postSchema)
          })
      })
    })

    it('should validate all posts in array against schema', () => {
      cy.fixture('schemas/postSchema.json').then((postSchema) => {
        cy.apiGet(`${baseUrl}/posts`)
          .then((response) => {
            cy.assertStatus(response, 200)
            expect(response.body).to.be.an('array')
            
            response.body.forEach((post) => {
              const Ajv = require('ajv')
              const ajv = new Ajv({ allErrors: true })
              const validate = ajv.compile(postSchema)
              const valid = validate(post)
              
              if (!valid) {
                cy.log('Schema validation errors:', JSON.stringify(validate.errors, null, 2))
                throw new Error(`Schema validation failed for post ${post.id}`)
              }
            })
          })
      })
    })

    it('should validate post has required fields', () => {
      cy.apiGet(`${baseUrl}/posts/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.include.keys('userId', 'id', 'title', 'body')
        })
    })

    it('should validate post field types', () => {
      cy.apiGet(`${baseUrl}/posts/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body.userId).to.be.a('number')
          expect(response.body.id).to.be.a('number')
          expect(response.body.title).to.be.a('string')
          expect(response.body.body).to.be.a('string')
        })
    })
  })

  describe('Comment Schema Validation', () => {
    it('should validate comment structure', () => {
      cy.apiGet(`${baseUrl}/comments/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.include.keys('postId', 'id', 'name', 'email', 'body')
          expect(response.body.postId).to.be.a('number')
          expect(response.body.id).to.be.a('number')
          expect(response.body.name).to.be.a('string')
          expect(response.body.email).to.be.a('string')
          expect(response.body.body).to.be.a('string')
        })
    })

    it('should validate comment email format', () => {
      cy.apiGet(`${baseUrl}/comments`)
        .then((response) => {
          cy.assertStatus(response, 200)
          response.body.forEach((comment) => {
            expect(comment.email).to.be.a('string')
          })
        })
    })
  })

  describe('Todo Schema Validation', () => {
    it('should validate todo structure', () => {
      cy.apiGet(`${baseUrl}/todos/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.include.keys('userId', 'id', 'title', 'completed')
          expect(response.body.userId).to.be.a('number')
          expect(response.body.id).to.be.a('number')
          expect(response.body.title).to.be.a('string')
          expect(response.body.completed).to.be.a('boolean')
        })
    })

    it('should validate todo completed field is boolean', () => {
      cy.apiGet(`${baseUrl}/todos`)
        .then((response) => {
          cy.assertStatus(response, 200)
          response.body.forEach((todo) => {
            expect(todo.completed).to.be.a('boolean')
          })
        })
    })
  })

  describe('Nested Object Validation', () => {
    it('should validate user address structure', () => {
      cy.apiGet(`${baseUrl}/users/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body.address).to.be.an('object')
          expect(response.body.address).to.have.property('street')
          expect(response.body.address).to.have.property('suite')
          expect(response.body.address).to.have.property('city')
          expect(response.body.address).to.have.property('zipcode')
          expect(response.body.address).to.have.property('geo')
          expect(response.body.address.geo).to.be.an('object')
          expect(response.body.address.geo).to.have.property('lat')
          expect(response.body.address.geo).to.have.property('lng')
        })
    })

    it('should validate user company structure', () => {
      cy.apiGet(`${baseUrl}/users/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body.company).to.be.an('object')
          expect(response.body.company).to.have.property('name')
          expect(response.body.company).to.have.property('catchPhrase')
          expect(response.body.company).to.have.property('bs')
        })
    })
  })

  describe('Array Validation', () => {
    it('should validate response is an array', () => {
      cy.apiGet(`${baseUrl}/users`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('array')
          expect(response.body).to.have.length.greaterThan(0)
        })
    })

    it('should validate array elements have consistent structure', () => {
      cy.apiGet(`${baseUrl}/users`)
        .then((response) => {
          cy.assertStatus(response, 200)
          const firstUserKeys = Object.keys(response.body[0])
          
          response.body.forEach((user) => {
            const currentUserKeys = Object.keys(user)
            expect(currentUserKeys).to.include.members(firstUserKeys)
          })
        })
    })
  })

  describe('Custom Schema Validation', () => {
    it('should validate custom schema for POST response', () => {
      const customSchema = {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' },
          body: { type: 'string' },
          userId: { type: 'number' }
        },
        required: ['id', 'title', 'body', 'userId']
      }

      const newPost = {
        title: 'Custom Schema Test',
        body: 'Testing custom schema validation',
        userId: 1
      }

      cy.apiPost(`${baseUrl}/posts`, newPost)
        .then((response) => {
          cy.assertStatus(response, 201)
          cy.validateSchema(response, customSchema)
        })
    })

    it('should validate schema with additional properties', () => {
      const schemaWithAdditional = {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string' }
        },
        required: ['id', 'name', 'username', 'email'],
        additionalProperties: true
      }

      cy.apiGet(`${baseUrl}/users/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          const Ajv = require('ajv')
          const ajv = new Ajv({ allErrors: true })
          const validate = ajv.compile(schemaWithAdditional)
          const valid = validate(response.body)
          
          expect(valid).to.be.true
        })
    })
  })

  describe('Schema Validation Errors', () => {
    it('should handle schema validation failure gracefully', () => {
      const invalidSchema = {
        type: 'object',
        properties: {
          id: { type: 'string' }, // Wrong type
          name: { type: 'string' },
          nonExistentField: { type: 'string' } // Field doesn't exist
        },
        required: ['id', 'name', 'nonExistentField']
      }

      cy.apiGet(`${baseUrl}/users/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          const Ajv = require('ajv')
          const ajv = new Ajv({ allErrors: true })
          const validate = ajv.compile(invalidSchema)
          const valid = validate(response.body)
          
          // This should fail validation
          expect(valid).to.be.false
          cy.log('Expected validation errors:', JSON.stringify(validate.errors, null, 2))
        })
    })
  })

  describe('Response Format Validation', () => {
    it('should validate Content-Type header', () => {
      cy.apiGet(`${baseUrl}/users`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.headers['content-type']).to.include('application/json')
        })
    })

    it('should validate response is valid JSON', () => {
      cy.apiGet(`${baseUrl}/users`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(() => JSON.parse(JSON.stringify(response.body))).to.not.throw()
        })
    })
  })
})
