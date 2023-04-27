Cypress.Commands.add('deleteAllWebsites', () => {
  cy.get('[data-cy=dashboard-website-listing]', { timeout: 10000 }).should('be.visible');
  cy.document().then((doc) => {
    const websiteCount = doc.querySelectorAll('.p-6').length;
    if (websiteCount > 0) {
      for (let i = 0; i < websiteCount; i++) {
        cy.get('[data-cy="dashboard-website-item"]').eq(0).click();
        cy.get('[data-cy="dashboard-website-delete-website-button"]').eq(0).click();
        cy.get('[data-cy="dashboard-delete-website-modal-confirm-button"]').click();
      }
    }
  });
});

Cypress.Commands.add('createWebsite', (websiteName) => {
  cy.get('[data-cy="dashboard-create-website-button"]').click();
  cy.get('[data-cy="dashboard-create-website-modal-website-name-input"]').clear();
  cy.get(
    '[data-cy="dashboard-create-website-modal-website-name-input"]'
  ).type(`${websiteName}{enter}`, { force: true });
  cy.get('[data-cy="dashboard-create-website-modal-confirm-button"]').click();
});
