describe('The home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('successfully loads', {tags: ['@homepage', '@smoke']}, () => {
    cy.findByRole('heading', {level: 1, name: "Track the U.S. Government's goals"}).should('exist');
  });

  it('has 9 goal cards on load', {tags: ['@homepage', '@smoke', '@goalSearch', '@goals']}, () => {
    cy.get('.usa-card-group').within(($group) => {
      cy.findAllByRole('listitem').should('have.length', 9);
    });
  });
});

// search is there
// search filters goals when used
// tags are present
// tags filter when used
// tags are disabled when they don't match
// clearing tags enables previously disabled ones
// Show more button works
// cards have title, description if present, and explore goal button

// USA banner
// mvp banner
// header is there
// Check breadcrumb doesn't exist