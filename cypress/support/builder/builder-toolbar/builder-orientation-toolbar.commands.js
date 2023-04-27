Cypress.Commands.add('switchOrientation', (deviceOrientation, expectedOrientationWidth) => {
  cy.get(`[data-cy="toolbar-orientation-${ deviceOrientation }-button"]`).click();
  cy.get('[data-cy="showcase-holder"]').invoke('outerWidth').should('be.eq', expectedOrientationWidth);
});
