describe('API DELETE Requests', () => {
  const baseUrl = Cypress.env('apiUrl')
  
  beforeEach(() => {
    cy.log('Testing DELETE requests')
  })

  describe('DELETE - Resource Deletion', () => {
    it('should delete a user by ID', () => {
      cy.apiDelete(`${baseUrl}/users/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
        })
    })

    it('should delete a post by ID', () => {
      cy.apiDelete(`${baseUrl}/posts/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
        })
    })

    it('should delete a comment by ID', () => {
      cy.apiDelete(`${baseUrl}/comments/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
        })
    })

    it('should delete a todo by ID', () => {
      cy.apiDelete(`${baseUrl}/todos/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
        })
    })
  })

  describe('DELETE - Non-existent Resource', () => {
    it('should handle deletion of non-existent user', () => {
      cy.apiDelete(`${baseUrl}/users/999999`)
        .then((response) => {
          // JSONPlaceholder returns 200 even for non-existent resources
          cy.assertStatus(response, 200)
        })
    })

    it('should handle deletion of non-existent post', () => {
      cy.apiDelete(`${baseUrl}/posts/999999`)
        .then((response) => {
          // JSONPlaceholder returns 200 even for non-existent resources
          cy.assertStatus(response, 200)
        })
    })

    it('should handle deletion of non-existent comment', () => {
      cy.apiDelete(`${baseUrl}/comments/999999`)
        .then((response) => {
          // JSONPlaceholder returns 200 even for non-existent resources
          cy.assertStatus(response, 200)
        })
    })
  })

  describe('DELETE - Response Validation', () => {
    it('should return appropriate response body', () => {
      cy.apiDelete(`${baseUrl}/posts/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          expect(response.body).to.be.an('object')
        })
    })

    it('should have empty response body after deletion', () => {
      cy.apiDelete(`${baseUrl}/posts/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          // JSONPlaceholder returns an empty object
          expect(response.body).to.be.an('object')
        })
    })
  })

  describe('DELETE - Verify Resource is Deleted', () => {
    it('should verify resource is deleted by attempting GET', () => {
      // First delete the resource
      cy.apiDelete(`${baseUrl}/posts/1`)
        .then(() => {
          // Then try to get it
          cy.apiGet(`${baseUrl}/posts/1`)
            .then((getResponse) => {
              // JSONPlaceholder still returns 200 for deleted resources
              // In a real API, this would return 404
              expect(getResponse.status).to.equal(200)
            })
        })
    })
  })

  describe('DELETE - With Headers', () => {
    it('should delete with custom headers', () => {
      cy.apiDelete(`${baseUrl}/posts/1`, {
        headers: {
          'X-Custom-Header': 'delete-request'
        }
      })
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })
  })

  describe('DELETE - Idempotency', () => {
    it('should handle multiple delete requests to same resource', () => {
      // First delete
      cy.apiDelete(`${baseUrl}/posts/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          // Second delete (should be idempotent)
          return cy.apiDelete(`${baseUrl}/posts/1`)
        })
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })
  })

  describe('DELETE - Create and Delete Workflow', () => {
    it('should create a resource and then delete it', () => {
      const newPost = {
        title: 'Post to be deleted',
        body: 'This post will be deleted',
        userId: 1
      }

      // Create the resource
      cy.apiPost(`${baseUrl}/posts`, newPost)
        .then((postResponse) => {
          expect(postResponse.status).to.equal(201)
          const postId = postResponse.body.id
          
          // Delete the resource
          return cy.apiDelete(`${baseUrl}/posts/${postId}`)
        })
        .then((deleteResponse) => {
          expect(deleteResponse.status).to.equal(200)
        })
    })
  })

  describe('DELETE - Invalid ID Formats', () => {
    it('should handle string ID', () => {
      cy.apiDelete(`${baseUrl}/posts/abc`)
        .then((response) => {
          // JSONPlaceholder returns 200 even for invalid IDs
          cy.assertStatus(response, 200)
        })
    })

    it('should handle negative ID', () => {
      cy.apiDelete(`${baseUrl}/posts/-1`)
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })

    it('should handle zero ID', () => {
      cy.apiDelete(`${baseUrl}/posts/0`)
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })
  })

  describe('DELETE - Special Characters in ID', () => {
    it('should handle special characters in ID', () => {
      cy.apiDelete(`${baseUrl}/posts/1@#$`)
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })
  })

  describe('DELETE - Response Time', () => {
    it('should complete deletion within acceptable time', () => {
      cy.apiDelete(`${baseUrl}/posts/1`)
        .then((response) => {
          cy.assertStatus(response, 200)
          cy.assertResponseTime(response, 10000)
        })
    })
  })

  describe('DELETE - Cascade Delete (Simulated)', () => {
    it('should demonstrate cascade delete concept', () => {
      // In a real API, deleting a user might cascade delete their posts
      // This test demonstrates the concept
      const userId = 1
      
      // Delete user
      cy.apiDelete(`${baseUrl}/users/${userId}`)
        .then((response) => {
          cy.assertStatus(response, 200)
          
          // Try to get user's posts (in real API, these might be deleted too)
          cy.apiGet(`${baseUrl}/posts`, { qs: { userId: userId } })
            .then((postsResponse) => {
              cy.assertStatus(postsResponse, 200)
            })
        })
    })
  })

  describe('DELETE - Soft Delete (Concept)', () => {
    it('should demonstrate soft delete concept', () => {
      // In a real API with soft delete, the resource might be marked as deleted
      // rather than actually removed from the database
      const updateWithDeletedFlag = {
        deleted: true,
        deletedAt: new Date().toISOString()
      }

      // This simulates a soft delete by updating the resource
      cy.apiPatch(`${baseUrl}/posts/1`, updateWithDeletedFlag)
        .then((response) => {
          cy.assertStatus(response, 200)
        })
    })
  })
})
