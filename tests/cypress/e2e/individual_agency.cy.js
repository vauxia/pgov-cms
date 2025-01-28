describe('The NASA agency page', () => {
  beforeEach(() => {
    cy.visit('/agencies/nasa');
  });
  it('successfully loads', {tags: ['@agencyPage', '@smoke']}, () => {
    cy.findByRole('img', {name: "Performance.gov logo"}).should('exist');
    cy.findByRole('link', {name: 'Home'}).should('exist');
    cy.findByRole('link', {name: 'Agencies'}).should('exist');
    cy.get('.usa-breadcrumb').within(($group) => {
      cy.findByText('NASA').should('exist');
      cy.findAllByRole('listitem').should('have.length', 3);
    });
    cy.findByRole('img', {name: 'NASA-Seal'}).should('exist');
    cy.findByRole('heading', {level: 1, name: 'National Aeronautics and Space Administration'}).should('exist');
    cy.findByRole('heading', {level: 2, name: 'Mission'}).should('exist');
    cy.findByText('NASA explores the unknown in air and space, innovates for the benefit of humanity, and inspires the world through discovery.').should('exist');
    cy.findAllByRole('heading', {level: 2, name: 'National Aeronautics and Space Administration Strategic Plan (FY2022-26)'}).should('have.length', 2);
    // Should there be double?
    // cy.findByRole('heading', {level: 2, name: 'National Aeronautics and Space Administration Strategic Plan (FY2022-26)'}).should('exist');
    cy.findByRole('heading', {level: 3, name: 'Strategic goals'}).should('exist');
    cy.findByRole('heading', {level: 3, name: 'Agency priority goals'}).should('exist');
    cy.findAllByRole('heading', {level: 3, name: 'Related documents'}).should('have.length', 2);
    cy.findAllByRole('heading', {level: 2, name: 'Related Resources'}).should('exist');
    cy.get('main section').within(($main) => {
      cy.findAllByRole('listitem').should('have.length', 13);
      cy.findAllByRole('link').should('have.length', 13);
    });
    cy.get('#related-resources + ul').within(($list) => {
      cy.findAllByRole('listitem').should('have.length', 1);
      cy.findByRole('link', {name: 'Visit the NASA website'});
    });
  });

  it('has a side nav', {tags: ['@agencyPage', '@smoke']}, () => {
    cy.findByRole('heading', {level: 4, name: 'On this page'}).should('exist');
    cy.get('.usa-in-page-nav__nav').within(($nav) => {
      cy.findAllByRole('listitem').should('have.length', 8);
      cy.findAllByRole('link').should('have.length', 8);
      cy.findAllByRole('listitem').each(($item, $index) => {
        const primaryIndexes = [0,1,5,7];
        cy.wrap($item).should('have.class', 'usa-in-page-nav__item');
        if(primaryIndexes.includes($index)) {
          cy.wrap($item).should('have.class', 'usa-in-page-nav__item--primary');
        }
      })
    });
  });
});
