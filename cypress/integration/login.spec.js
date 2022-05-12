/// <reference types="Cypress" />
describe('login', () => {

    before('visit login page', () => {
        cy.visit('/');
        cy.get('a[href="/login"]').click();
        cy.url().should('include', '/login');
    })

    it('login with empty credentials', () => {
        cy.get('button[class="btn btn-custom"]').click();
        cy.url().should('include', '/login');
    })

    it('login with empty email', () => {
        cy.get('#password').type('12345678');
        cy.get('button[class="btn btn-custom"]').click();
        cy.url().should('include', '/login');
    })

    it('login with invalid email - not registered', () => {
        cy.get('#email').type('dijana5@gmail.com');
        cy.get('button[class="btn btn-custom"]').click();
        cy.url().should('include', '/login');
    })

    it('login with invalid email - without @', () => {
        cy.get('#email').clear().type('dijanagmail.com');
        cy.get('button[class="btn btn-custom"]').click();
        cy.url().should('include', '/login');
    })

    it('login with empty password', () => {
        cy.get('#email').clear().type('dijana@gmail.com');
        cy.get('#password').clear()
        cy.get('button[class="btn btn-custom"]').click();
        cy.url().should('include', '/login');
    })

    it('login with invalid password', () => {
        cy.get('#password').type('123');
        cy.get('button[class="btn btn-custom"]').click();
        cy.url().should('include', '/login');
    })

    it('login with valid data', () => {
        cy.get('#password').clear().type('12345678');
        cy.get('button[class="btn btn-custom"]').click();
        cy.url().should('not.include', '/login');
    })

    it('logout', () => {
        cy.get("a[class='nav-link nav-buttons']").last().click();
        cy.url().should('include', '/login');
    })
})