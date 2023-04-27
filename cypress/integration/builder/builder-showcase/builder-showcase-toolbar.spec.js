/// <reference types='cypress' />

context('Actions', () => {
  beforeEach(() => {
    cy.navigateToRoute('builder/SUIeRzfEsL9fCXkWo3cd');
  });

  describe('builder showcase toolbar', () => {
    it('should display the showcase toolbar and not allow a non-registered user to save their website', () => {
      cy.get('[data-cy="toolbar-save-button"]').click();
      cy.closeActiveModal('Create account', null);
    });

    it('should display the showcase toolbar and allow a user to enter full screen mode', () => {
      cy.get('.toolbar-full-screen-button').click();
    });

    it('should display the showcase toolbar and allow a user to enter and exit preview mode', () => {
      cy.enterPreviewMode(1220);
      cy.enterPreviewMode(900);
      cy.enterPreviewMode(1220);
      cy.exitPreviewMode(900);
    });
  });
});
