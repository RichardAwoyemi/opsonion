/// <reference types="cypress" />

declare namespace Cypress {
  // noinspection JSUnusedGlobalSymbols
  interface Chainable {
    /**
     * Custom command to access an iframe HTML element by id
     * @example cy.getIframeBody('builder-showcase')
     */
    getIframeBody(id: string): Chainable<Element>;
    /**
     * Custom command to change the font size of text within an element
     * @example cy.changeFontSize('13', '18');
     */
    changeFontSize(oldFontSize: string, newFontSize: string): Chainable<Element>;
    /**
     * Custom command to change the font name of text within an element
     * @example cy.changeFontName('nunito', 'abeezee');
     */
    changeFontName(oldFontName: string, newFontName: string): Chainable<Element>;
    /**
     * Custom command to navigate to a route
     * @example cy.navigateToRoute('/builder/SUIeRzfEsL9fCXkWo3cd');
     */
    navigateToRoute(routeName: string);
    /**
     * Custom command to select a sidebar menu option
     * @example cy.selectSidebarMenuOption('colours');
     */
    selectSidebarMenuOption(optionName: string);
    /**
     * Custom command to edit text within a contenteditable field
     * @example cy.editContentEditableTextField('features', 0, 0, 'Testing');
     */
    editContentEditableTextField(
      componentName: string,
      componentIndex: number,
      textEditorIndex: number,
      text: string
    );
    /**
     * Custom command to rename a website with a valid title
     * @example cy.renameWebsiteWithValidName('musing-easley-69837554', true);
     */
    renameWebsiteWithValidName(newWebsiteName: string, confirmSave: boolean);
    /**
     * Custom command to rename a website with an invalid title
     * @example cy.renameWebsiteWithInvalidName('');
     */
    renameWebsiteWithInvalidName(newWebsiteName: string);
    /**
     * Custom command to close active modal window
     * @example cy.closeActiveModal('Create account', 'Do you want to create an account');
     */
    closeActiveModal(modalTitle: string, modalBody: string);
    /**
     * Custom command to login with an email address and password
     * @example cy.loginWithEmailAndPassword('test@opsonion.com', 'password');
     */
    loginWithEmailAndPassword(email: string, password: string);
    /**
     * Custom command to delete all websites in dashboard view
     * @example cy.deleteAllWebsites();
     */
    deleteAllWebsites();
    /**
     * Custom command to create a website
     * @example cy.createWebsite('musing-easley-69837554');
     */
    createWebsite(websiteName: string);
    /**
     * Custom command to enter preview mode
     * @example cy.enterPreviewMode(1200);
     */
    enterPreviewMode(expectedWindowWidth: number);
    /**
     * Custom command to exit preview mode
     * @example cy.exitPreviewMode(900);
     */
    exitPreviewMode(expectedWindowWidth: number);
    /**
     * Custom command to check that a set of pages exist from the toolbar
     * @example cy.checkPagesFromToolbar(['Home', 'About]);
     */
    checkPagesFromToolbar(listOfPages: string[]);
    /**
     * Custom command to add a new page from the toolbar
     * @example cy.addPageFromToolbar('Shop');
     */
    addPageFromToolbar(pageName: string, confirmAdd: boolean);
    /**
     * Custom command to delete a page by index from the toolbar
     * @example cy.deletePageFromToolbar(1, false);
     */
    deletePageFromToolbar(pageIndex: number, confirmDelete: boolean);
    /**
     * Custom command to view a page from the toolbar
     * @example cy.viewPageFromToolbar(1, 'About');
     */
    viewPageFromToolbar(pageIndex: number, pageName: string);
    /**
     * Custom command to switch showcase orientation
     * @example cy.viewPageFromSidebar('desktop', 900);
     */
    switchOrientation(deviceOrientation: string, expectedOrientationWidth: number);
  }
}
