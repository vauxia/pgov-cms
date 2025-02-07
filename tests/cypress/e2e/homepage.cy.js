describe('The home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads', {tags: ['@homepage', '@smoke']}, () => {
    cy.findByRole('img', {name: "Performance.gov logo"}).should('exist');
    cy.findByRole('heading', {level: 1, name: "Track the U.S. Government's goals"}).should('exist');
    cy.get('.usa-breadcrumb').should('not.exist');
  });

  it('has goal search', {tags: ['@homepage', '@smoke', '@goalSearch', '@goals']}, () => {
    cy.findByLabelText('Search goals', {selector: 'input'}).should('exist');
    cy.findByRole('button', {name: 'Search goals'}).should('exist');
    // 30 tags
    cy.get('form + ul').within(($group) => {
      cy.findAllByRole('listitem').should('have.length', 30);
      cy.findAllByRole('listitem').each(($item) => {
        cy.wrap($item).within(($inner) => {
          cy.findByRole('button').should('have.class', 'usa-button--outline');
        });
      });
    });
    cy.get('.usa-card-group').within(($group) => {
      cy.findAllByRole('listitem').should('have.length', 9);
    });
    cy.findByRole('button', {name: 'Show more'}).should('exist');
  });
});
