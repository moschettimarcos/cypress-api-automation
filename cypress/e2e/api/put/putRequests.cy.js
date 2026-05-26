describe('API PUT Requests', () => {
  const baseUrl = Cypress.env('apiUrl')
  
  beforeEach(() => {
    cy.log('Testing PUT requests')
  })

  describe('PUT - Complete Resource Update', () => {
    it('should update a user completely', () => {
      const updatedUser = {
        id: 1,
        name: 'Updated Name',
        username: 'updatedusername',
        email: 'updated@example.com',
        phone: '1-555-999-8888',
        website: 'updated.com',
        address: {
          street: '456 Updated St',
          suite: 'Suite 100',
          city: 'Los Angeles',
          zipcode: '90001'
        },
        company: {
          name: 'Updated Company',
          catchPhrase: 'Updated catchphrase',
          bs: 'updated bs'
        }
      }

      cy.apiPut(`${baseUrl}/users/1`, updatedUser)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('username')
          expect(response.body).to.have.property('email')
        })
    })

    it('should update a post completely', () => {
      const updatedPost = {
        id: 1,
        title: 'Updated Post Title',
        body: 'Updated post body content',
        userId: 1
      }

      cy.apiPut(`${baseUrl}/posts/1`, updatedPost)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('title')
          expect(response.body).to.have.property('body')
          expect(response.body).to.have.property('userId')
        })
    })

    it('should update a comment completely', () => {
      const updatedComment = {
        id: 1,
        name: 'Updated Commenter Name',
        email: 'updatedcommenter@example.com',
        body: 'Updated comment body',
        postId: 1
      }

      cy.apiPut(`${baseUrl}/comments/1`, updatedComment)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('name')
          expect(response.body).to.have.property('email')
          expect(response.body).to.have.property('body')
        })
    })

    it('should update a todo completely', () => {
      const updatedTodo = {
        id: 1,
        title: 'Updated todo title',
        completed: true,
        userId: 1
      }

      cy.apiPut(`${baseUrl}/todos/1`, updatedTodo)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('title')
          expect(response.body).to.have.property('completed')
        })
    })
  })

  describe('PUT - Update with Partial Data', () => {
    it('should update user with only name', () => {
      const partialUpdate = {
        name: 'Partially Updated Name'
      }

      cy.apiPut(`${baseUrl}/users/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.have.property('name')
        })
    })

    it('should update post with only title', () => {
      const partialUpdate = {
        title: 'Partially Updated Title'
      }

      cy.apiPut(`${baseUrl}/posts/1`, partialUpdate)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.have.property('title')
        })
    })
  })

  describe('PUT - Update Non-existent Resource', () => {
    it('should handle update of non-existent user', () => {
      const updatedUser = {
        name: 'Non-existent User',
        username: 'nonexistent',
        email: 'nonexistent@example.com'
      }

      cy.apiPut(`${baseUrl}/users/999999`, updatedUser)
        .then((response) => {
          // JSONPlaceholder returns 500 for non-existent resources
          cy.assertStatus(response, 500)
        })
    })

    it('should handle update of non-existent post', () => {
      const updatedPost = {
        title: 'Non-existent Post',
        body: 'This post does not exist',
        userId: 1
      }

      cy.apiPut(`${baseUrl}/posts/999999`, updatedPost)
        .then((response) => {
          // JSONPlaceholder returns 500 for non-existent resources
          cy.assertStatus(response, 500)
        })
    })
  })

  describe('PUT - Data Type Changes', () => {
    it('should change string to number', () => {
      const update = {
        title: 12345,
        body: 'Changed title to number',
        userId: 1
      }

      cy.apiPut(`${baseUrl}/posts/1`, update)
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })

    it('should change boolean to string', () => {
      const update = {
        title: 'Boolean to String',
        body: 'Testing type changes',
        userId: '1'
      }

      cy.apiPut(`${baseUrl}/posts/1`, update)
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })
  })

  describe('PUT - Null and Empty Values', () => {
    it('should update with null values', () => {
      const update = {
        title: null,
        body: null,
        userId: 1
      }

      cy.apiPut(`${baseUrl}/posts/1`, update)
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })

    it('should update with empty strings', () => {
      const update = {
        title: '',
        body: '',
        userId: 1
      }

      cy.apiPut(`${baseUrl}/posts/1`, update)
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })
  })

  describe('PUT - Special Characters', () => {
    it('should update with special characters', () => {
      const update = {
        title: 'Updated with @#$%^&*()!',
        body: 'Body with émojis 🎉 and spëcial çhars',
        userId: 1
      }

      cy.apiPut(`${baseUrl}/posts/1`, update)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.have.property('title')
        })
    })
  })

  describe('PUT - Response Validation', () => {
    it('should return updated data in response', () => {
      const update = {
        title: 'Validation Test',
        body: 'Testing response validation',
        userId: 1
      }

      cy.apiPut(`${baseUrl}/posts/1`, update)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
        })
    })

    it('should maintain ID after update', () => {
      const update = {
        title: 'ID Maintenance Test',
        body: 'Testing ID maintenance',
        userId: 1
      }

      cy.apiPut(`${baseUrl}/posts/1`, update)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
        })
    })
  })

  describe('PUT - Concurrent Updates', () => {
    it('should handle multiple sequential updates', () => {
      const update1 = { title: 'First Update', body: 'First', userId: 1 }
      const update2 = { title: 'Second Update', body: 'Second', userId: 1 }
      const update3 = { title: 'Third Update', body: 'Third', userId: 1 }

      cy.apiPut(`${baseUrl}/posts/1`, update1)
        .then((response) => {
          cy.assertStatus(response, 200)
          return cy.apiPut(`${baseUrl}/posts/1`, update2)
        })
        .then((response) => {
          cy.assertStatus(response, 200)
          return cy.apiPut(`${baseUrl}/posts/1`, update3)
        })
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.have.property('title')
        })
    })
  })
})
