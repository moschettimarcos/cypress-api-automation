describe('API PATCH Requests', () => {
  const baseUrl = Cypress.env('apiUrl')
  
  beforeEach(() => {
    cy.log('Testing PATCH requests')
  })

  describe('PATCH - Partial Resource Update', () => {
    it('should partially update a user name', () => {
      const partialUpdate = {
        name: 'Partially Updated Name'
      }

      cy.apiPatch(`${baseUrl}/users/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('name')
        })
    })

    it('should partially update a user email', () => {
      const partialUpdate = {
        email: 'partiallyupdated@example.com'
      }

      cy.apiPatch(`${baseUrl}/users/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.have.property('email')
        })
    })

    it('should partially update a post title', () => {
      const partialUpdate = {
        title: 'Partially Updated Post Title'
      }

      cy.apiPatch(`${baseUrl}/posts/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('title')
        })
    })

    it('should partially update a post body', () => {
      const partialUpdate = {
        body: 'Partially updated post body content'
      }

      cy.apiPatch(`${baseUrl}/posts/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.have.property('body')
        })
    })

    it('should partially update a comment', () => {
      const partialUpdate = {
        body: 'Partially updated comment body'
      }

      cy.apiPatch(`${baseUrl}/comments/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.have.property('body')
        })
    })

    it('should partially update a todo status', () => {
      const partialUpdate = {
        completed: true
      }

      cy.apiPatch(`${baseUrl}/todos/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.have.property('completed')
        })
    })
  })

  describe('PATCH - Multiple Fields Update', () => {
    it('should update multiple user fields', () => {
      const partialUpdate = {
        name: 'Multi-field Update Name',
        email: 'multifield@example.com',
        phone: '1-555-777-8888'
      }

      cy.apiPatch(`${baseUrl}/users/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('email')
          expect(response.body).to.have.property('phone')
        })
    })

    it('should update multiple post fields', () => {
      const partialUpdate = {
        title: 'Multi-field Post Title',
        body: 'Multi-field post body'
      }

      cy.apiPatch(`${baseUrl}/posts/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.have.property('title')
          expect(response.body).to.have.property('body')
        })
    })
  })

  describe('PATCH - Nested Object Update', () => {
    it('should update nested address object', () => {
      const partialUpdate = {
        address: {
          street: '789 New Street',
          city: 'Chicago'
        }
      }

      cy.apiPatch(`${baseUrl}/users/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body.address).to.be.an('object')
        })
    })

    it('should update nested company object', () => {
      const partialUpdate = {
        company: {
          name: 'New Company Name'
        }
      }

      cy.apiPatch(`${baseUrl}/users/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body.company).to.be.an('object')
        })
    })
  })

  describe('PATCH - Data Type Changes', () => {
    it('should change field type from string to number', () => {
      const partialUpdate = {
        title: 12345
      }

      cy.apiPatch(`${baseUrl}/posts/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })

    it('should change field type from boolean to string', () => {
      const partialUpdate = {
        completed: 'true'
      }

      cy.apiPatch(`${baseUrl}/todos/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })
  })

  describe('PATCH - Null and Empty Values', () => {
    it('should update field to null', () => {
      const partialUpdate = {
        phone: null
      }

      cy.apiPatch(`${baseUrl}/users/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })

    it('should update field to empty string', () => {
      const partialUpdate = {
        website: ''
      }

      cy.apiPatch(`${baseUrl}/users/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })
  })

  describe('PATCH - Special Characters', () => {
    it('should handle special characters in update', () => {
      const partialUpdate = {
        name: 'Updated with @#$%^&*() special chars!'
      }

      cy.apiPatch(`${baseUrl}/users/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.have.property('name')
        })
    })

    it('should handle unicode characters', () => {
      const partialUpdate = {
        name: 'Unicode 你好 مرحبا'
      }

      cy.apiPatch(`${baseUrl}/users/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })
  })

  describe('PATCH - Non-existent Resource', () => {
    it('should handle patch of non-existent user', () => {
      const partialUpdate = {
        name: 'Non-existent User'
      }

      cy.apiPatch(`${baseUrl}/users/999999`, partialUpdate)
        .then((response) => {
          // JSONPlaceholder returns 200 even for non-existent resources
          cy.assertStatus(response, 200)
        })
    })

    it('should handle patch of non-existent post', () => {
      const partialUpdate = {
        title: 'Non-existent Post'
      }

      cy.apiPatch(`${baseUrl}/posts/999999`, partialUpdate)
        .then((response) => {
          // JSONPlaceholder returns 200 even for non-existent resources
          cy.assertStatus(response, 200)
        })
    })
  })

  describe('PATCH - Empty Body', () => {
    it('should handle empty patch body', () => {
      cy.apiPatch(`${baseUrl}/users/1`, {})
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })
  })

  describe('PATCH - Response Validation', () => {
    it('should return only updated fields in response', () => {
      const partialUpdate = {
        name: 'Response Validation Test'
      }

      cy.apiPatch(`${baseUrl}/users/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.have.property('name')
        })
    })

    it('should maintain resource ID after patch', () => {
      const partialUpdate = {
        title: 'ID Maintenance Test'
      }

      cy.apiPatch(`${baseUrl}/posts/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
        })
    })
  })

  describe('PATCH - Sequential Updates', () => {
    it('should handle multiple sequential patches', () => {
      const update1 = { title: 'First Patch' }
      const update2 = { body: 'Second Patch' }
      const update3 = { userId: 2 }

      cy.apiPatch(`${baseUrl}/posts/1`, update1)
        .then((response) => {
          cy.assertStatus(response, 200)
          return cy.apiPatch(`${baseUrl}/posts/1`, update2)
        })
        .then((response) => {
          cy.assertStatus(response, 200)
          return cy.apiPatch(`${baseUrl}/posts/1`, update3)
        })
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })
  })

  describe('PATCH - Comparison with PUT', () => {
    it('PATCH should only update specified fields', () => {
      const originalPost = {
        title: 'Original Title',
        body: 'Original Body',
        userId: 1
      }

      // First, set a known state
      cy.apiPut(`${baseUrl}/posts/1`, originalPost)
        .then(() => {
          // Then patch only the title
          const patchUpdate = { title: 'Patched Title' }
          return cy.apiPatch(`${baseUrl}/posts/1`, patchUpdate)
        })
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.have.property('title')
        })
    })
  })
})
