/// <reference types="Cypress" />
import { loginPage } from "../page_objects/loginPage";

describe("login POM", () => {

  beforeEach('visit login page', () => {
    cy.visit("/login");
    cy.url().should('contain', '/login');
    loginPage.loginHeading.should('have.text', 'Please login');
  })

  it("try login with invalid password", () => {
    cy.intercept({
      method: 'POST',
      url: 'https://gallery-api.vivifyideas.com/api/auth/login'
    }).as('unsuccessfullogin');

    loginPage.login('dijana@gmail.com', '123');
    cy.wait('@unsuccessfullogin').then(interception => {
      console.log('RESPONSE', interception)
      //console.log('RESPONSE', interception.response.statusCode)
      expect(interception.response.statusCode).eq(401)
      expect(interception.response.statusMessage).eq('Unauthorized')
    })

    loginPage.errorMsg.should('be.visible')
      .and('have.text', 'Bad Credentials')
      .and('have.css', 'background-color', 'rgb(248, 215, 218)');
    cy.url().should('include', '/login');
  })

  it('try login with invalid email', () => {
    cy.intercept({
      method: 'POST',
      url: 'https://gallery-api.vivifyideas.com/api/auth/login'
    }).as('unsuccessfullogin')

    loginPage.login('blabla@bla.com', '12345678');
    cy.wait('@unsuccessfullogin').then(interception => {
      console.log('response', interception);
      expect(interception.response.statusCode).eq(401);
    })
    loginPage.errorMsg.should('be.visible')
      .and('have.text', 'Bad Credentials');
    cy.url().should('include', '/login');

  })

  it("login with valid data", () => {
    cy.intercept({
      method: 'POST',
      url: 'https://gallery-api.vivifyideas.com/api/auth/login'
    }).as('successfullogin');

    cy.intercept({
      method: 'GET',
      url: 'https://gallery-api.vivifyideas.com/api/galleries?page=1&term='
    }).as('allGalleries');

    cy.intercept({
      method: 'POST',
      url: 'https://gallery-api.vivifyideas.com/api/auth/logout'
    }).as('logout');

    loginPage.login('dijana@gmail.com', '12345678');

    cy.wait('@successfullogin').then(interception => {
      console.log('RESPONSE', interception)
      expect(interception.response.statusCode).eq(200)
      expect(interception.response.body.user_id).eq(54)
    })

    cy.wait('@allGalleries').then(interception => {
      console.log('RESPONSE', interception)
      expect(interception.response.statusCode).eq(200)
    })

    cy.get('a').contains('Logout').should('be.visible').click();
    cy.wait('@logout').then(interception => {
      console.log('RESPONSE', interception)
      expect(interception.response.statusCode).eq(200)
    })

  })

})
