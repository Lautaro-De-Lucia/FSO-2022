/* eslint-disable */
describe('Blog app', function() {
  beforeEach(function() {
   cy.request('POST', 'http://localhost:3003/api/testing/reset')
   const user = {
     username: 'Reptiloide',
     name: 'Ricardo Iorio',
     password: 'Almafuerte'
   }
   cy.request('POST', 'http://localhost:3003/api/users/', user) 
   cy.visit('http://localhost:3000')
  })
 
  it('Login Form is Shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-login').type('Reptiloide')
      cy.get('#password-login').type('Almafuerte')
      cy.get('#login-button').click()
      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-login').type('Reptiloide')
      cy.get('#password-login').type('Malón')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })

  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username-login').type('Reptiloide')
      cy.get('#password-login').type('Almafuerte')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      const blog = {
        title: "Toro y Pampa",
        author: "Ricardo Iorio",
        url: "https://www.youtube.com"
      }
      cy.contains('create blog').click()
      cy.get('#input-title').type(blog.title)
      cy.get('#input-author').type(blog.author)
      cy.get('#input-url').type(blog.url)
      cy.contains('submit').click()
      cy.contains(blog.title+' - '+blog.author)
    })

    describe('After creating a blog...', function() {
      beforeEach(function() {
        const blog = {
          title: "Toro y Pampa",
          author: "Ricardo Iorio",
          url: "https://www.youtube.com"
        }
        cy.contains('create blog').click()
        cy.get('#input-title').type(blog.title)
        cy.get('#input-author').type(blog.author)
        cy.get('#input-url').type(blog.url)
        cy.contains('submit').click()
      })        
      it('The blog can be liked', function() {
        cy.contains('show details').click()
        cy.contains('like').click()
        cy.contains('like').click()
        cy.contains('Likes: 2')
      })
      it('The blog can be deleted', function() {
        cy.contains('delete').click()
        cy.contains('removed')        
      })
    })
  })

  

})