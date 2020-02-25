/// <reference types="cypress" />

describe('App smokes', () => {
  before(() => {
    cy.visit('/')
  })

  describe('Homepage', () => {
    it('should load properly home page', () => {
      cy.location('pathname').should('eq', '/githubusers/');
    })
  })

  describe('Profile', () => {
    before(() => {
      cy.get('.media a').first().click()
    })
    
    it('should load properly profile', () => {
      cy.location('pathname').should('contain', '/githubusers/profile');
      cy.contains('Bio').should('be.visible')
      cy.contains('Followers').should('be.visible')
      cy.contains('Following').should('be.visible')
      cy.contains('Repositories').should('be.visible')
      cy.contains('Gists').should('be.visible')
    })

    it('back button should move to home', () => {
      cy.contains('Back').click();
      cy.location('pathname').should('eq', '/githubusers/');
    })
  })

  describe('Search', () => {
    before(() => {
      cy.contains('Search').click();
    })

    it('should load properly search', () => {
      cy.location('pathname').should('eq', '/githubusers/search');
    })

    it('input should find user', () => {
      cy.get('input[placeholder="Search user"]').type('mjurkowski', {
        delay: 30
      })
      cy.wait(1000)
      cy.get('.media a').first().should('be.visible')
    })

    it('should move to profile after click', () => {
      cy.get('.media a').first().click()
      cy.location('pathname').should('eq', '/githubusers/profile/mjurkowski');
    })

    it('back button should move to search', () => {
      cy.contains('Back').click()
      cy.location('pathname').should('eq', '/githubusers/search');
    })
  })



  
})
