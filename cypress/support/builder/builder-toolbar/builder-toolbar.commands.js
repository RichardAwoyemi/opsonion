Cypress.Commands.add(
  'changeFontName',
  (oldFontSelector, newFontSelector = 'abeezee', scrollTo = 'top') => {
    cy.get('[data-cy=builder-toolbar-' + oldFontSelector + '-font-name]').click({ force: true });
    cy.get('.toolbar-sidebar-menu-tab-content .active-menu-option img').should(
      'have.attr',
      'alt',
      oldFontSelector
    );
    cy.get('.toolbar-sidebar-menu-tab-content')
      .find('cdk-virtual-scroll-viewport')
      .scrollTo(scrollTo)
      .find('[data-cy="builder-sidebar-menu-layout-select-' + newFontSelector + '"]', {
        timeout: 5000,
      })
      .eq(0)
      .click({ force: true });
    cy.get('.toolbar-sidebar-menu-tab-content .active-menu-option img').should(
      'have.attr',
      'alt',
      newFontSelector
    );
    cy.get(`[data-cy=builder-toolbar-${newFontSelector}-font-name]`);
  }
);

Cypress.Commands.add('changeFontSize', (oldFontSize, newFontSize) => {
  const isOldFontDisplayed = [
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    21,
    24,
    32,
    36,
    42,
    48,
    56,
    64,
    72,
    80,
    88,
    96,
    104,
    120,
    144,
  ].includes(Number(oldFontSize));
  const isNewFontDisplayed = [
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    21,
    24,
    32,
    36,
    42,
    48,
    56,
    64,
    72,
    80,
    88,
    96,
    104,
    120,
    144,
  ].includes(Number(newFontSize));
  cy.get('[data-cy=builder-toolbar-font-size]').click({ force: true });
  if (isOldFontDisplayed) {
    cy.get('.dropdown-item.active-menu-option').should('have.text', oldFontSize);
  } else {
    cy.get('.dropdown-item.active-menu-option').should('not.exist');
  }
  if (isNewFontDisplayed) {
    cy.get('[data-cy="builder-sidebar-menu-layout-select-' + newFontSize + '"]').click({
      force: true,
    });
  } else {
    cy.get('[data-cy=builder-toolbar-font-size-input]')
      .should('have.value', oldFontSize)
      .clear({ force: true })
      .type(newFontSize + '{enter}');
  }
  cy.get('[data-cy=builder-toolbar-font-size-input]').should('have.value', newFontSize);
});

Cypress.Commands.add('selectToolbarMenuOption', (optionName) => {
  cy.get(`[data-cy="toolbar-${optionName}-button"]`).click();
});
