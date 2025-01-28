describe('The site footer', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('successfully loads', {tags: ['@footer', '@smoke']}, () => {
    cy.get('footer').should('exist');
    cy.get('footer').should('have.class', 'height-8');
    cy.get('footer').should('have.class', 'bg-black');
  });
});
