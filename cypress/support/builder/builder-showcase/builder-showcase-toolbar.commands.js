Cypress.Commands.add('checkPagesFromToolbar', (listOfPages) => {
  cy.get('[data-cy="pages-dropdown"]').click();
  cy.get('.toolbar-dropdown-item').should('have.length', listOfPages.length);
  for (let i = 0; i < listOfPages.length; i++) {
    cy.get(`[data-cy="toolbar-dropdown-item-${i}"]`).contains(listOfPages[i]);
  }
});

Cypress.Commands.add('addPageFromToolbar', (pageName, confirmAdd) => {
  cy.get('[data-cy="toolbar-page-add-button"]').click();
  if (confirmAdd) {
    cy.get('[data-cy="page-new-input"]').type(pageName);
    cy.get('[data-cy="page-new-save"]').click();
  }
});

Cypress.Commands.add('deletePageFromToolbar', (pageIndex, confirmDelete) => {
  cy.get('[data-cy="pages-dropdown"]').click();
  cy.get(`[data-cy="toolbar-dropdown-item-${pageIndex}"]`).click();
  cy.get('[data-cy="toolbar-page-delete-button"]').click();
  if (confirmDelete) {
    cy.get('[data-cy="page-delete-yes"]').click();
  }
});

Cypress.Commands.add('viewPageFromToolbar', (pageIndex, pageName) => {
  cy.get('[data-cy="pages-dropdown"]').click();
  cy.get(`[data-cy="toolbar-dropdown-item-${pageIndex}"]`).click();
  cy.get('[data-cy="pages-dropdown"]').contains(pageName);
});

Cypress.Commands.add('checkPagesFromSidebar', (listOfPages) => {
  cy.get('[data-cy="builder-sidebar-menu-pages-icon"]').click();
  cy.get('.page-row-option').should('have.length', listOfPages.length);
  for (let i = 0; i < listOfPages.length; i++) {
    cy.get(`[data-cy="builder-sidebar-pages-title-${i}"]`).contains(listOfPages[i]);
  }
});

Cypress.Commands.add('enterPreviewMode', (expectedWindowWidth) => {
  cy.get('[data-cy="toolbar-preview-button"]').click();
  cy.get('[data-cy="showcase-holder"]').invoke('outerWidth').should('be.eq', expectedWindowWidth);
});

Cypress.Commands.add('exitPreviewMode', (expectedWindowWidth) => {
  cy.get('[data-cy="toolbar-preview-exit-button"]').click();
  cy.get('[data-cy="showcase-holder"]').invoke('outerWidth').should('be.eq', expectedWindowWidth);
});
