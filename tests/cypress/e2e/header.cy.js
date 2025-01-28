describe('The site header', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('successfully loads on desktop', {tags: ['@header', '@smoke', '@desktop']}, () => {
    cy.viewport('macbook-13');
    cy.findByRole('img', {name: "Performance.gov logo"}).should('exist');
    cy.get('.usa-header--basic').within(($group) => {
      cy.findAllByRole('link').should('have.length', 2);
    });
    cy.findByLabelText('Search', {selector: 'input'}).should('exist');
    cy.findByRole('button', {name: 'Search'}).should('exist');
    cy.findByRole('button', {name: 'Menu'}).should('not.exist');
  });

  it('successfully loads on mobile', {tags: ['@header', '@smoke', '@mobile']}, () => {
    cy.viewport('iphone-8');
    cy.findByRole('img', {name: "Performance.gov logo"}).should('exist');
    cy.get('.usa-header--basic').within(($group) => {
      cy.findAllByRole('link').should('have.length', 0);
    });
    cy.findByLabelText('Search', {selector: 'input'}).should('not.to.be.visible');
    cy.findByRole('button', {name: 'Search'}).should('not.exist');
    cy.findByRole('button', {name: 'Menu'}).should('exist');
    cy.findByRole('button', {name: 'Menu'}).click();
    cy.get('.usa-header--basic').within(($group) => {
      cy.findAllByRole('link').should('have.length', 2);
    });
    cy.findByLabelText('Search', {selector: 'input'}).should('exist');
    cy.findByRole('button', {name: 'Search'}).should('exist');
    cy.findByRole('button', {name: 'Close Navigation Menu'}).should('exist');
  });
});