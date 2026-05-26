describe('API GET Requests', () => {
  const baseUrl = Cypress.env('apiUrl')
  
  beforeEach(() => {
    cy.log('Testing GET requests')
  })

  describe('GET - Basic Requests', () => {
    it('should get all users', () => {
      cy.apiGet(`${baseUrl}/users`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('array')
          expect(response.body).to.have.length.greaterThan(0)
          cy.assertResponseTime(response, 5000)
        })
    })

    it('should get all posts', () => {
      cy.apiGet(`${baseUrl}/posts`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('array')
          expect(response.body).to.have.length.greaterThan(0)
        })
    })

    it('should get all comments', () => {
      cy.apiGet(`${baseUrl}/comments`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('array')
          expect(response.body).to.have.length.greaterThan(0)
        })
    })
  })

  describe('GET - Single Resource', () => {
    it('should get a single user by ID', () => {
      cy.apiGet(`${baseUrl}/users/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('id')
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('email')
        })
    })

    it('should get a single post by ID', () => {
      cy.apiGet(`${baseUrl}/posts/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('id')
          expect(response.body).to.have.property('title')
          expect(response.body).to.have.property('body')
        })
    })

    it('should get a single comment by ID', () => {
      cy.apiGet(`${baseUrl}/comments/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('id')
          expect(response.body).to.have.property('email')
        })
    })
  })

  describe('GET - Query Parameters', () => {
    it('should get posts by userId', () => {
      cy.apiGet(`${baseUrl}/posts`, { qs: { userId: 1 } })
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('array')
          response.body.forEach(post => {
            expect(post.userId).to.equal(1)
          })
        })
    })

    it('should get comments by postId', () => {
      cy.apiGet(`${baseUrl}/comments`, { qs: { postId: 1 } })
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('array')
          response.body.forEach(comment => {
            expect(comment.postId).to.equal(1)
          })
        })
    })

    it('should handle multiple query parameters', () => {
      cy.apiGet(`${baseUrl}/posts`, { qs: { userId: 1, _limit: 5 } })
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('array')
          expect(response.body).to.have.length.at.most(5)
          response.body.forEach(post => {
            expect(post.userId).to.equal(1)
          })
        })
    })
  })

  describe('GET - Custom Headers', () => {
    it('should send request with custom headers', () => {
      cy.apiGet(`${baseUrl}/users`, {
        headers: {
          'Accept': 'application/json',
          'X-Custom-Header': 'test-value'
        }
      })
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('array')
        })
    })

    it('should send request with Content-Type header', () => {
      cy.apiGet(`${baseUrl}/users`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('array')
        })
    })
  })

  describe('GET - Response Validation', () => {
    it('should validate response headers', () => {
      cy.apiGet(`${baseUrl}/users`)
        .then((response) => {
          cy.assertStatus(response, 200)
          cy.assertHeader(response, 'content-type')
          expect(response.headers['content-type']).to.include('application/json')
        })
    })

    it('should validate response structure', () => {
      cy.apiGet(`${baseUrl}/users/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.include.keys(
            'id', 'name', 'username', 'email', 'phone', 'website', 'address', 'company'
          )
        })
    })

    it('should validate data types in response', () => {
      cy.apiGet(`${baseUrl}/users/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body.id).to.be.a('number')
          expect(response.body.name).to.be.a('string')
          expect(response.body.email).to.be.a('string')
          expect(response.body.address).to.be.an('object')
          expect(response.body.company).to.be.an('object')
        })
    })
  })

  describe('GET - Performance Testing', () => {
    it('should complete request within acceptable time', () => {
      cy.apiGet(`${baseUrl}/users`)
        .then((response) => {
          cy.assertStatus(response, 200)
          cy.assertResponseTime(response, 10000)
        })
    })

    it('should handle multiple sequential requests', () => {
      cy.apiGet(`${baseUrl}/users`).then((response1) => {
        expect(response1.status).to.equal(200)
        return cy.apiGet(`${baseUrl}/posts`)
      }).then((response2) => {
        expect(response2.status).to.equal(200)
        return cy.apiGet(`${baseUrl}/comments`)
      }).then((response3) => {
        expect(response3.status).to.equal(200)
      })
    })
  })

  describe('GET - Edge Cases', () => {
    it('should handle non-existent resource', () => {
      cy.apiGet(`${baseUrl}/users/999999`)
        .then((response) => {
          expect(response.status).to.equal(404)
        })
    })

    it('should handle invalid endpoint', () => {
      cy.apiGet(`${baseUrl}/invalid-endpoint`)
        .then((response) => {
          expect(response.status).to.equal(404)
        })
    })
  })
})
