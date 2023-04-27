context('Actions', () => {
  beforeEach(() => {
    cy.navigateToRoute('builder/SUIeRzfEsL9fCXkWo3cd');
  });

  describe('builder orientation - toolbar', () => {
    it('should display the toolbar menu and allow a user to switch orientations', () => {
      cy.switchOrientation('desktop', 630);
    });
  });
});
