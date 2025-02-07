describe('An individual goal page', () => {
  it('successfully loads an Agency priority goal', {tags: ['@goalPage', '@goals', '@apg', '@smoke']}, () => {
    cy.visit('/agencies/nasa/space-technology-leadership');
    cy.findByRole('img', {name: "Performance.gov logo"}).should('exist');
    cy.get('.usa-breadcrumb').within(($group) => {
      cy.findByRole('link', {name: 'Home'}).should('exist');
      cy.findByRole('link', {name: 'Agencies'}).should('exist');
      cy.findByRole('link', {name: 'NASA'}).should('exist');
      cy.findByText('Space Technology Leadership').should('exist');
      cy.findAllByRole('listitem').should('have.length', 4);
    });
    cy.get('.goal-type').within(($item) => {
      cy.wrap($item).should('have.class', 'goal-type--apg');
      cy.findByText('Agency priority goal').should('exist');
      cy.get('span').should('has.class', 'bg-primary-vivid');
      cy.get('span').should('has.class', 'usa-tag');
    });
    cy.findByRole('img', {name: 'NASA-Seal'}).should('exist');
    cy.findByRole('heading', {level: 1, name: 'Space Technology Leadership'}).should('exist');
    cy.findByRole('heading', {level: 2, name: 'About this NASA priority goal'}).should('exist');
    cy.get('#goal-description + div.font-body-md').should('exist');
    cy.findByText('Strategic plan:').should('exist');
    cy.findByRole('link', {name: 'National Aeronautics and Space Administration Strategic Plan (FY2022-26)'}).should('exist');
    cy.findByRole('heading', {level: 2, name: 'Objectives'}).should('exist');
    cy.get('#objectives + ol').should('exist');
    cy.get('#objectives + ol > li').each(($item) => {
      cy.wrap($item).within(($inner) => {
        cy.findByRole('heading', {level: 3}).should('exist');
        cy.findByRole('heading', {level: 4, name: 'Performance indicators'}).should('exist');
        cy.get('p').should('exist');
        cy.get('table').should('exist');
        cy.findByRole('columnheader', {name: 'Start date'}).should('exist');
        cy.findByRole('columnheader', {name: 'End date'}).should('exist');
        cy.findByRole('columnheader', {name: 'Actual result'}).should('exist');
        cy.findByRole('columnheader', {name: 'Target result'}).should('exist');
      });
    });
    cy.get('div + ul > li').each(($item) => {
      cy.wrap($item).within(($inner) => {
        cy.findByText('General science/space/technology').should('exist');
        cy.get('span').should('have.class', 'usa-tag');
      })
    });
    // Test side nav.
    cy.findByRole('heading', {level: 4, name: 'On this page'}).should('exist');
    cy.get('.usa-in-page-nav__nav').within(($nav) => {
      cy.findAllByRole('listitem').should('have.length', 6);
      cy.findAllByRole('link').should('have.length', 6);
      cy.findAllByRole('listitem').each(($item, $index) => {
        const primaryIndexes = [0,1];
        cy.wrap($item).should('have.class', 'usa-in-page-nav__item');
        if(primaryIndexes.includes($index)) {
          cy.wrap($item).should('have.class', 'usa-in-page-nav__item--primary');
        }
      })
    });
  });

  it('successfully loads an Strategic goal', {tags: ['@goalPage', '@goals', '@strategic', '@smoke']}, () => {
    cy.visit('/agencies/nasa/expand-human-knowledge-through-new-scientific-discoveries');
    cy.findByRole('img', {name: "Performance.gov logo"}).should('exist');
   
    cy.get('.usa-breadcrumb').within(($group) => {
      cy.findByRole('link', {name: 'Home'}).should('exist');
      cy.findByRole('link', {name: 'Agencies'}).should('exist');
      cy.findByRole('link', {name: 'NASA'}).should('exist');
      cy.findByText('Expand human knowledge through new scientific discoveries').should('exist');
      cy.findAllByRole('listitem').should('have.length', 4);
    });
    cy.get('.goal-type').within(($item) => {
      cy.wrap($item).should('have.class', 'goal-type--strategic');
      cy.findByText('Strategic goal').should('exist');
      cy.get('span').should('has.class', 'bg-base-darkest');
      cy.get('span').should('has.class', 'usa-tag');
    });
    cy.findByRole('img', {name: 'NASA-Seal'}).should('exist');
    cy.findByRole('heading', {level: 1, name: 'Expand human knowledge through new scientific discoveries'}).should('exist');
    cy.findByRole('heading', {level: 2, name: 'About this NASA strategic goal'}).should('exist');
    cy.get('#goal-description + div.font-body-md').should('exist');
    cy.findByText('Strategic plan:').should('exist');
    cy.findByRole('link', {name: 'National Aeronautics and Space Administration Strategic Plan (FY2022-26)'}).should('exist');
    cy.findByRole('heading', {level: 2, name: 'Objectives'}).should('exist');
    cy.get('#objectives + ol').should('exist');
    cy.get('#objectives + ol > li').each(($item) => {
      cy.wrap($item).within(($inner) => {
        
        cy.findByRole('heading', {level: 3}).should('exist');
        cy.findByRole('heading', {level: 4, name: 'Performance indicators'}).should('exist');
        cy.get('p').should('exist');
        cy.get('ol > li').each(($subItem) => {
          cy.wrap($subItem).within(($subInner) => {
            cy.get('table').should('exist');
            cy.findByRole('columnheader', {name: 'Start date'}).should('exist');
            cy.findByRole('columnheader', {name: 'End date'}).should('exist');
            cy.findByRole('columnheader', {name: 'Actual result'}).should('exist');
            cy.findByRole('columnheader', {name: 'Target result'}).should('exist');
          });
        });
      });
    });
    cy.get('div + ul > li').each(($item) => {
      cy.wrap($item).within(($inner) => {
        cy.findByText('General science/space/technology').should('exist');
        cy.get('span').should('have.class', 'usa-tag');
      })
    });
    // Test side nav.
    cy.findByRole('heading', {level: 4, name: 'On this page'}).should('exist');
    cy.get('.usa-in-page-nav__nav').within(($nav) => {
      cy.findAllByRole('listitem').should('have.length', 5);
      cy.findAllByRole('link').should('have.length', 5);
      cy.findAllByRole('listitem').each(($item, $index) => {
        const primaryIndexes = [0,1];
        cy.wrap($item).should('have.class', 'usa-in-page-nav__item');
        if(primaryIndexes.includes($index)) {
          cy.wrap($item).should('have.class', 'usa-in-page-nav__item--primary');
        }
      })
    });
  });
});
