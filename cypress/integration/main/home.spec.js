/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  describe('home', () => {
    it('should display welcome message', () => {
      cy.get('[data-cy="heading"]').contains('No coders. No designers. No barriers.');
      cy.get('[data-cy="subheading"]').contains(
        'Opsonion is a platform that makes building websites easier than ever.'
      );
    });

    it('should have create website button', () => {
      cy.get('[data-cy="build-button"]').contains('Create Your Free Website');
    });

    it('should have login link in navbar and allow user to browse to login page', () => {
      cy.get('[data-cy="login-link"]').contains('Login');
      cy.get('[data-cy="login-link"]').click();
      cy.url().should('include', '/login');
    });

    it('should have register link in navbar and allow user to browse to register page', () => {
      cy.get('[data-cy="register-link"]').contains('Register');
      cy.get('[data-cy="register-link"]').click();
      cy.url().should('include', '/register');
    });

    it('should have press link in footer and allow user to browse to press page', () => {
      cy.get('[data-cy="press-link"]').contains('Press');
      cy.get('[data-cy="press-link"]').click();
      cy.url().should('include', '/press');
    });

    it('should have legal link in footer and allow user to browse to legal page', () => {
      cy.get('[data-cy="legal-link"]').contains('Legal');
      cy.get('[data-cy="legal-link"]').click();
      cy.url().should('include', '/legal');
    });

    it('should have contact link in footer', () => {
      cy.get('[data-cy="contact-link"]').contains('Contact');
    });
  });
});
