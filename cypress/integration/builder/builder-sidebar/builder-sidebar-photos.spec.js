/// <reference types='cypress' />

context('Actions', () => {
  beforeEach(() => {
    cy.navigateToRoute('builder/SUIeRzfEsL9fCXkWo3cd');
  });

  describe('builder sidebar - photos', () => {
    it('should display the photos sidebar menu', () => {
      cy.get('[data-cy="builder-sidebar-menu-photos-icon"]').click({ timeout: 2500 });
    });
  });
});
