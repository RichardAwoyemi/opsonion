/// <reference types='cypress' />

function setWebsiteName() {
  const uuid = () => Cypress._.random(0, 1e6);
  return `agitated-torvalds-${uuid()}`;
}

context('Actions', () => {
  describe('builder header for non-registered user', () => {
    beforeEach(() => {
      cy.navigateToRoute('builder/SUIeRzfEsL9fCXkWo3cd');
    });

    it('should display the website name', () => {
      cy.get('[data-cy="builder-header-website-name"]').contains(/\w+/);
    });

    it('should allow the user to change the website name', () => {
      const websiteName = setWebsiteName();
      cy.renameWebsiteWithValidName(websiteName, true);
      cy.get('[data-cy="builder-header-website-name"]').contains(websiteName);
    });

    it('should not allow the user to have an empty website name', () => {
      const websiteName = setWebsiteName();
      cy.renameWebsiteWithValidName(websiteName, true);
      cy.renameWebsiteWithInvalidName('');
      cy.get('[data-cy="builder-header-website-name"]').contains(websiteName);
    });

    it('should not allow the user to enter an offensive term as a website name', () => {
      const websiteName = setWebsiteName();
      cy.renameWebsiteWithValidName(websiteName, true);
      cy.get('[data-cy="builder-header-website-name"]').contains(websiteName);
      cy.renameWebsiteWithInvalidName('threesome');
      cy.renameWebsiteWithInvalidName('他妈ㄉ王八蛋');
      cy.get('[data-cy="builder-header-website-name"]').contains(websiteName);
    });

    it('should allow the user to revert a website name change', () => {
      const websiteName = setWebsiteName();
      cy.renameWebsiteWithValidName(websiteName, true);
      cy.renameWebsiteWithValidName(`very-${websiteName}`, false);
      cy.get('[data-cy="builder-header-website-name"]').contains(websiteName);
    });

    it('should not allow non-registered user to publish a website', () => {
      cy.get('[data-cy="builder-header-publish"]').click();
      cy.closeActiveModal('Create account', null);
    });

    it('should allow non-registered user to sign up', () => {
      cy.get('[data-cy="builder-header-create-account"]').click();
      cy.closeActiveModal('Create account', null);
    });

    it('should not redirect user to dashboard', () => {
      cy.get('[data-cy="builder-header-logo"]').click();
      cy.get('[data-cy="heading"]').contains('No coders. No designers. No barriers.');
      cy.get('[data-cy="subheading"]').contains(
        'Opsonion is a platform that makes building websites easier than ever.'
      );
      cy.get('[data-cy="build-button"]').contains('Create Your Free Website');
    });
  });

  describe('builder header for registered user', () => {
    beforeEach(() => {
      cy.navigateToRoute('login');
      cy.loginWithEmailAndPassword('test@opsonion.com', 'XS0586130022');
      cy.deleteAllWebsites();
    });

    it('should redirect user to dashboard', () => {
      cy.createWebsite(setWebsiteName());
      cy.get('[data-cy="builder-header-logo"]', { timeout: 10000 }).click();
      cy.deleteAllWebsites();
    });
  });
});
