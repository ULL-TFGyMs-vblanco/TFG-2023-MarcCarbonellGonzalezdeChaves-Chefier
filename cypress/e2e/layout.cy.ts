describe('Layout', () => {
  it('Desktop width', () => {
    cy.visit('/');

    cy.get('p').contains('Explorar');

    cy.get('a').contains('Nueva receta').click();

    cy.url().should('include', '/auth/login');

    cy.get('[alt="Navbar Chefier isotype"]').click();

    cy.get('p').contains('Explorar');

    cy.get('a').contains('Iniciar sesión').click();

    cy.url().should('include', '/auth/login');

    cy.get('[alt="Footer Chefier logotype"]').click();

    cy.get('p').contains('Explorar');

    cy.get('#moon');

    cy.get('[data-testid="theme-button"]').click();

    cy.get('#sun');

    cy.get('#searchbar').type('pollo{enter}');

    cy.url().should('include', 'search=pollo');

    cy.get('p').contains('Resultados de búsqueda para "pollo"');
  });

  it('Mobile width', () => {
    cy.visit('/');

    cy.viewport(320, 650);

    cy.get('p').contains('Explorar');

    cy.get('#new-recipe-btn').click();

    cy.url().should('include', '/auth/login');

    cy.get('[alt="Navbar Chefier logotype"]').click();

    cy.get('p').contains('Explorar');

    cy.get('#moon');

    cy.get('[data-testid="theme-button"]').click();

    cy.get('#sun');

    cy.get('#searchbar').type('pollo{enter}');

    cy.url().should('include', 'search=pollo');

    cy.get('p').contains('Resultados de búsqueda para "pollo"');

    cy.get('[data-testid="toggle-menu"]').should('not.exist');

    cy.get('[data-testid="toggle-button"]').click();

    cy.get('[data-testid="toggle-menu"]')
      .contains('a')
      .contains('Iniciar sesión')
      .click();

    cy.url().should('include', '/auth/login');

    cy.get('[data-testid="toggle-menu"]').should('not.be.visible');

    cy.get('[data-testid="toggle-button"]').click();

    cy.get('[data-testid="toggle-menu"]').should('be.visible');

    cy.get('[data-testid="toggle-button"]').click();

    cy.get('[data-testid="toggle-menu"]').should('not.be.visible');
  });
});
