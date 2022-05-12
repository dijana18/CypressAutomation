const Locators = require('../fixtures/Locators.json');

describe('Login with locators', () => {

    beforeEach('visit login page', () => {
        cy.visit('/login');
    })

    it('login with invalid email - without @', () => {
        cy.get(Locators.Login.emailInput).type('dijanagmail.com');
        cy.get(Locators.Login.passwordInput).type('12345678');
        cy.get(Locators.Login.submitBtn).click();
        cy.url().should('include', '/login')
    })

    it('login with invalid email - without .', () => {
        cy.get(Locators.Login.emailInput).type('dijana@gmailcom');
        cy.get(Locators.Login.passwordInput).type('12345678');
        cy.get(Locators.Login.submitBtn).click();
        cy.url().should('include', '/login')
    })

    it('login with invalid password - without digits', () => {
        cy.get(Locators.Login.emailInput).type('dijana@gmail.com');
        cy.get(Locators.Login.passwordInput).type('Test');
        cy.get(Locators.Login.submitBtn).click();
        cy.url().should('include', '/login')
    })

    it('login with invalid password - too short', () => {
        cy.get(Locators.Login.emailInput).type('dijana@gmail.com');
        cy.get(Locators.Login.passwordInput).type('Test2');
        cy.get(Locators.Login.submitBtn).click();
        cy.url().should('include', '/login')
    })

    it('login with valid data', () => {
        cy.get(Locators.Login.emailInput).type('dijana@gmail.com');
        cy.get(Locators.Login.passwordInput).type('12345678');
        cy.get(Locators.Login.submitBtn).click();
        cy.url().should('not.include', '/login');
        //logout
        cy.get(Locators.Logout.logoutBtn).eq(2).click();
    })

})