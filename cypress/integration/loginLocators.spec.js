const Locators = require('../fixtures/Locators.json');

describe('Login with locators', () => {

    before ('visit login page', () => {
        cy.visit('/login');
    })

    it ('login with valid data', () => {
        cy.get(Locators.Login.emailInput).type('dijana@gmail.com');
        cy.get(Locators.Login.passwordInput).type('12345678');
        cy.get(Locators.Login.submitBtn).click();
        cy.url().should('not.include','/login')
    })  


    it ('logout', () => {
       cy.get(Locators.Logout.logoutBtn).click();
    })  
    
})