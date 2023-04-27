// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

const compareColor = (color, property) => (targetElement) => {
  const tempElement = document.createElement('div');
  tempElement.style.color = color;
  tempElement.style.display = 'none';
  document.body.appendChild(tempElement);
  const tempColor = window.getComputedStyle(tempElement).color;
  const targetColor = window.getComputedStyle(targetElement[0])[property];
  document.body.removeChild(tempElement);
  expect(tempColor).to.equal(targetColor);
};

Cypress.Commands.add('getIframeBody', (target) => {
  cy.log('getIframeBody');
  return cy
    .get(`iframe[data-cy="${target}"]`, { log: false })
    .its('0.contentDocument.body', { log: false })
    .should('not.be.empty')
    .then((body) => cy.wrap(body, { log: false }));
});

Cypress.Commands.add(
  'uploadFile',
  {
    prevSubject: 'element',
  },
  (input, fileName, fileType) => {
    cy.fixture(fileName)
      .then((content) => Cypress.Blob.base64StringToBlob(content, fileType))
      .then((blob) => {
        const testFile = new File([blob], fileName, { type: fileType });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        input[0].files = dataTransfer.files;
        return input;
      });
  }
);

Cypress.Commands.overwrite('should', (originalFn, subject, expectation, ...args) => {
  const customMatchers = {
    'have.backgroundColor': compareColor(args[0], 'backgroundColor'),
    'have.borderColor': compareColor(args[0], 'borderColor'),
    'have.color': compareColor(args[0], 'color'),
  };
  if (typeof expectation === 'string' && customMatchers[expectation]) {
    return originalFn(subject, customMatchers[expectation]);
  }
  return originalFn(subject, expectation, ...args);
});

Cypress.Commands.add('navigateToRoute', (routeName) => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb');
  const route = `http://localhost:4200/${routeName}`;
  cy.route('*').as('getAssets');
  cy.visit(route);
  cy.wait('@getAssets');
});

Cypress.Commands.add('checkColour', (componentName, propertyName, colour) => {
  cy.getIframeBody('builder-showcase')
    .find(`[data-cy="${componentName}-component"]`)
    .eq(0)
    .should('have.css', propertyName)
    .and('be.colored', colour);
});

Cypress.Commands.add('renameWebsiteWithValidName', (websiteName, confirmSave) => {
  cy.get('[data-cy="builder-header-website-name"]').contains(/\w+/);
  cy.get('[data-cy="builder-header-website-name"]').clear();
  cy.get('[data-cy="builder-header-website-name"]').type(`${websiteName}{enter}`);
  if (confirmSave) {
    cy.get('[data-cy="website-rename-yes"]').click();
  } else {
    cy.get('[data-cy="website-rename-no"]').click();
  }
});

Cypress.Commands.add('renameWebsiteWithInvalidName', (websiteName) => {
  cy.get('[data-cy="builder-header-website-name"]').contains(/\w+/);
  cy.get('[data-cy="builder-header-website-name"]').clear();
  cy.get('[data-cy="builder-header-website-name"]').type(`${websiteName}{enter}`);
  cy.get('[data-cy="modal-title"]').contains('Oops');
  cy.get('[data-cy="modal-body"]').contains('You cannot use this name. Please try something else.');
  cy.get('[data-cy="modal-close"]').first().click();
});

Cypress.Commands.add('closeActiveModal', (modalTitle, modalBody) => {
  if (modalTitle) {
    cy.get('[data-cy="modal-title"]').contains(modalTitle);
  }
  if (modalBody) {
    cy.get('[data-cy="modal-body"]').contains(modalBody);
  }
  cy.get('[data-cy="modal-close"]').first().click();
});

Cypress.Commands.add('loginWithEmailAndPassword', (email, password) => {
  cy.get('[data-cy="login-form-email-input"]').type(email);
  cy.get('[data-cy="login-form-password-input"]').type(password);
  cy.get('[data-cy="login-form-login-button"]').click();
});



