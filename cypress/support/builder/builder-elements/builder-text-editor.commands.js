// eslint-disable-next-line @typescript-eslint/no-unused-vars
const click = ($el) => {
  $el.click();
};

Cypress.Commands.add(
  'editContentEditableTextField',
  (componentName, componentIndex, textEditorIndex, text) => {
    const setText = ($el) => {
      $el.click();
      $el.text(text);
    };
    cy.getIframeBody('builder-showcase')
      .find(`[data-cy="${componentName}-component"]`)
      .eq(componentIndex)
      .find('[data-cy="builder-text-editor"]')
      .eq(textEditorIndex)
      .pipe(setText);
    cy.getIframeBody('builder-showcase')
      .find(`[data-cy="${componentName}-component"]`)
      .eq(componentIndex)
      .find('[data-cy="builder-text-editor"]')
      .eq(textEditorIndex)
      .invoke('text')
      .then((updatedText) => {
        expect(updatedText.trim()).to.eq(text);
      });
  }
);
