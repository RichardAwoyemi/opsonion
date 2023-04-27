Cypress.Commands.add('selectSidebarMenuOption', (optionName) => {
  cy.get(`[data-cy="builder-sidebar-menu-${optionName}-icon"]`).click();
});
