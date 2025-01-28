describe('The /agencies page', () => {
  beforeEach(() => {
    cy.visit('/agencies');
  });
  it('successfully loads', {tags: ['@agencies', '@smoke']}, () => {
    cy.findByRole('img', {name: "Performance.gov logo"}).should('exist');
    cy.findByRole('link', {name: 'Home'}).should('exist');
    cy.get('.usa-breadcrumb').within(($group) => {
      cy.findByText('Agencies').should('exist');
      cy.findAllByRole('listitem').should('have.length', 2);
    });
    cy.findByRole('heading', {level: 1, name: 'Explore federal goals'}).should('exist');
    cy.get('.usa-card-group').within(($group) => {
      cy.findAllByRole('listitem').should('have.length', 29);
      cy.findAllByRole('listitem').each(($card) => {
        cy.wrap($card).within(($innerGroup) => {
          cy.findByRole('heading', {level: 4}).should('exist');
          cy.findByRole('link', {name: 'Explore agency goals'}).should('exist');
        });
      });
    });
  });
});
