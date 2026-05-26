describe('API POST Requests', () => {
  const baseUrl = Cypress.env('apiUrl')
  
  beforeEach(() => {
    cy.log('Testing POST requests')
  })

  describe('POST - Create Resources', () => {
    it('should create a new user', () => {
      const newUser = {
        name: 'Test User',
        username: 'testuser',
        email: 'testuser@example.com'
      }

      cy.apiPost(`${baseUrl}/users`, newUser)
        .then((response) => {
          cy.assertStatus(response, 201)
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('username')
          expect(response.body).to.have.property('email')
          expect(response.body).to.have.property('id')
        })
    })

    it('should create a new post', () => {
      const newPost = {
        title: 'Test Post',
        body: 'This is a test post content',
        userId: 1
      }

      cy.apiPost(`${baseUrl}/posts`, newPost)
        .then((response) => {
          cy.assertStatus(response, 201)
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('title')
          expect(response.body).to.have.property('body')
          expect(response.body).to.have.property('userId')
          expect(response.body).to.have.property('id')
        })
    })

    it('should create a new comment', () => {
      const newComment = {
        name: 'Test Commenter',
        email: 'commenter@example.com',
        body: 'This is a test comment',
        postId: 1
      }

      cy.apiPost(`${baseUrl}/comments`, newComment)
        .then((response) => {
          cy.assertStatus(response, 201)
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('email')
          expect(response.body).to.have.property('body')
          expect(response.body).to.have.property('postId')
          expect(response.body).to.have.property('id')
        })
    })

    it('should create a new todo', () => {
      const newTodo = {
        title: 'Complete task',
        completed: false,
        userId: 1
      }

      cy.apiPost(`${baseUrl}/todos`, newTodo)
        .then((response) => {
          cy.assertStatus(response, 201)
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('title')
          expect(response.body).to.have.property('completed')
          expect(response.body).to.have.property('userId')
          expect(response.body).to.have.property('id')
        })
    })
  })

  describe('POST - With Fixtures', () => {
    it('should create a user using fixture data', () => {
      cy.fixture('user.json').then((userData) => {
        cy.apiPost(`${baseUrl}/users`, userData)
          .then((response) => {
            cy.assertStatus(response, 201)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('username')
          })
      })
    })

    it('should create a post using fixture data', () => {
      cy.fixture('post.json').then((postData) => {
        cy.apiPost(`${baseUrl}/posts`, postData)
          .then((response) => {
            cy.assertStatus(response, 201)
            expect(response.body).to.have.property('title')
            expect(response.body).to.have.property('body')
          })
      })
    })

    it('should create a comment using fixture data', () => {
      cy.fixture('comment.json').then((commentData) => {
        cy.apiPost(`${baseUrl}/comments`, commentData)
          .then((response) => {
            cy.assertStatus(response, 201)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('email')
          })
      })
    })
  })

  describe('POST - Validation', () => {
    it('should validate required fields are present', () => {
      const incompletePost = {
        title: 'Test Post'
        // Missing body and userId
      }

      cy.apiPost(`${baseUrl}/posts`, incompletePost)
        .then((response) => {
          // JSONPlaceholder accepts incomplete data, but in real APIs this might return 400
          cy.assertStatus(response, 201)
        })
    })

    it('should handle empty body', () => {
      cy.apiPost(`${baseUrl}/posts`, {})
        .then((response) => {
          cy.assertStatus(response, 201)
        })
    })

    it('should handle null values', () => {
      const postWithNull = {
        title: null,
        body: null,
        userId: null
      }

      cy.apiPost(`${baseUrl}/posts`, postWithNull)
        .then((response) => {
          cy.assertStatus(response, 201)
        })
    })
  })

  describe('POST - Data Types', () => {
    it('should handle string data', () => {
      const stringData = {
        title: 'String Title',
        body: 'String Body',
        userId: '1' // String instead of number
      }

      cy.apiPost(`${baseUrl}/posts`, stringData)
        .then((response) => {
          cy.assertStatus(response, 201)
        })
    })

    it('should handle numeric data', () => {
      const numericData = {
        title: 12345,
        body: 67890,
        userId: 1
      }

      cy.apiPost(`${baseUrl}/posts`, numericData)
        .then((response) => {
          cy.assertStatus(response, 201)
        })
    })

    it('should handle boolean data', () => {
      const booleanData = {
        title: 'Boolean Test',
        body: 'Testing boolean values',
        userId: true
      }

      cy.apiPost(`${baseUrl}/posts`, booleanData)
        .then((response) => {
          cy.assertStatus(response, 201)
        })
    })
  })

  describe('POST - Special Characters', () => {
    it('should handle special characters in text', () => {
      const specialChars = {
        title: 'Test with @#$%^&*() special chars!',
        body: 'Body with émojis 🎉 and spëcial çharacters',
        userId: 1
      }

      cy.apiPost(`${baseUrl}/posts`, specialChars)
        .then((response) => {
          cy.assertStatus(response, 201)
          expect(response.body).to.have.property('title')
        })
    })

    it('should handle unicode characters', () => {
      const unicodeData = {
        title: 'Unicode Test 你好 مرحبا',
        body: 'Testing unicode characters αβγδε',
        userId: 1
      }

      cy.apiPost(`${baseUrl}/posts`, unicodeData)
        .then((response) => {
          cy.assertStatus(response, 201)
        })
    })
  })

  describe('POST - Large Data', () => {
    it('should handle large text content', () => {
      const largeText = 'A'.repeat(10000)
      const largeData = {
        title: 'Large Content Test',
        body: largeText,
        userId: 1
      }

      cy.apiPost(`${baseUrl}/posts`, largeData)
        .then((response) => {
          cy.assertStatus(response, 201)
        })
    })

    it('should handle nested objects', () => {
      const nestedData = {
        title: 'Nested Object Test',
        body: 'Testing nested objects',
        userId: 1,
        metadata: {
          author: 'Test Author',
          tags: ['test', 'automation', 'api'],
          settings: {
            published: true,
            featured: false
          }
        }
      }

      cy.apiPost(`${baseUrl}/posts`, nestedData)
        .then((response) => {
          cy.assertStatus(response, 201)
        })
    })
  })

  describe('POST - Array Data', () => {
    it('should handle array in request body', () => {
      const arrayData = {
        title: 'Array Test',
        body: 'Testing arrays',
        userId: 1,
        tags: ['test', 'automation', 'cypress']
      }

      cy.apiPost(`${baseUrl}/posts`, arrayData)
        .then((response) => {
          cy.assertStatus(response, 201)
        })
    })
  })
})
