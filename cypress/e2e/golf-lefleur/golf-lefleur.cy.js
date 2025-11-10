describe('Golf Le Fleur Website Test', () => {
  const base = 'https://golflefleur.com/';

  beforeEach(() => {
    cy.visit(base);
  });

  describe('Acess homepage', () => {
    it('should respond with status 200', () => {
      cy.request(base).its('status').should('eq', 200);
    });

    it('should display the logo', () => {
      cy.get('a.site-header__logo')
        .should('be.visible')
        .and('have.attr', 'href', '/');
    });
  });

  describe('View Fragrances', () => {
    it('should have a visible SHOP FRAGRANCE button', () => {
      cy.get('a.content_button')
        .contains('SHOP FRAGRANCE')
        .should('be.visible')
        .and('have.attr', 'href', '/collections/french-waltz');
    });

    it('should redirect to /collections/french-waltz when clicked', () => {
      cy.get('a.content_button').contains('SHOP FRAGRANCE').click();
      cy.url().should('eq', 'https://golflefleur.com/collections/french-waltz');
    });

    it('should display the 3 expected products on /collections/french-waltz', () => {
      cy.visit('https://golflefleur.com/collections/french-waltz');

      cy.get('.collection-grid__grid-item').should('have.length', 3);

      cy.get('.product-card__title-link').then(elements => {
        const texts = [...elements].map(el =>
          el.innerText.trim().toLowerCase()
        );
        expect(texts).to.include.members([
          'french waltz 100ml',
          'french waltz 50ml',
          'french waltz 10ml',
        ]);
      });
    });
  });

  describe('Darryl Chuck Purchase Flow - Negative Test', () => {
    beforeEach(() => {
      Cypress.on('uncaught:exception', () => false);
    });

    it('Cart must NOT be empty after adding a product', () => {
      cy.get('a.content_button')
        .contains('DARRYL CHUCKS AVAILABLE NOW')
        .click();

      cy.url().should('include', '/collections/shoes');

      cy.get(
        'a.product-card__image[href="/collections/shoes/products/darryl-chuck-70-orange"]'
      ).click({ force: true });

      cy.url().should(
        'include',
        '/collections/shoes/products/darryl-chuck-70-orange'
      );

      cy.get('button[js-add-to-cart]')
        .contains('Add To Cart')
        .click({ force: true });

      cy.get('a.site-header__logo').click();

      cy.url().should('eq', 'https://golflefleur.com/');

      cy.get('a.site-header__logo')
        .should('be.visible')
        .and('have.attr', 'href', '/')
        .click();

      cy.get('body').should('not.contain', 'Your cart is empty.');
    });
  });
});
