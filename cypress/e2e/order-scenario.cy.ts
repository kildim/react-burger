describe('User open the application main page, construct burger and make an order.', function () {

  beforeEach(() => {
    cy.intercept('GET', 'ingredients', {fixture: 'ingredients.json'}).as('ingredients');
    cy.intercept('POST', 'auth/login', {fixture: 'successful-authorization.json'});
    cy.intercept('GET', 'auth/user', {fixture: 'auth-user.json'});
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'});
    cy.setCookie('authorization', 'mock-authorization')
  })

  it('should start from the main page', function () {
    cy.visit('http://localhost:3000');
    cy.get('h1').contains('Соберите бургер');
  })

  it('should be Drag and Drop available', function () {
    cy.get('article').first().as('firstArticle');
    cy.get('[class^=burger-constructor_grid]').as('constructorContainer');
    cy.get('@constructorContainer').should('not.contain', 'БУЛКА 1');

    cy.get('@firstArticle').get('[class^=counter_counter__num]')
      .then(($prevCount) => {
          const prevCount = parseInt($prevCount.text());
          expect(prevCount).eq(0);
          cy.get('@firstArticle').trigger('dragstart')
            .then(() => {
              cy.get('@constructorContainer').trigger('drop')
                .then(() => {
                  cy.get('@firstArticle').get('[class^=counter_counter__num]')
                    .then(($succCount) => {
                      const succCount = Math.trunc(parseInt($succCount.text()) / 100000)
                      expect(succCount).eq(prevCount + 2);
                      cy.get('@constructorContainer').should('contain', 'БУЛКА 1');
                    })
                });
            });
        }
      )
  });

  it('should redirect to /login', function () {
    cy.contains('Оформить заказ').click()
      .then(() => cy.location().should((loc) => {
          expect(loc.pathname).to.be.eq('/login')
        })
      )
  })

  it('should authorize and redirect to main page', function () {
      cy.get('[type=email]').type('coding@kilin.biz')
      .then(() => cy.get('[type=password]').type('111qqq'))
      .then(() => cy.contains('Войти').click())
      .then(() => cy.location().should((loc) => {
          expect(loc.pathname).to.be.eq('/')
        })
      )

  })

  it('should make an order', function () {
    cy.contains('Оформить заказ').click()
      cy.get('[class^=modal_modal__]').should('contain', 'Ваш заказ начали готовить')
  })
});
export {}
