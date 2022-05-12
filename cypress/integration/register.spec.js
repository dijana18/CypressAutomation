/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';

describe('test register', () => {
    let registerData = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    before('visit register page', () => {
        cy.visit('/register');
        cy.url().should('include', '/register')
    })

    beforeEach('generate new fake data', () => {
        registerData.firstName = faker.name.firstName();
        registerData.lastName = faker.name.lastName();
        registerData.email = faker.internet.email();
        registerData.password = faker.internet.password(10, true, /[A-Z]/, '25');
    })

    it('try registration without first name', () => {
        cy.get('#last-name').type(registerData.lastName);
        cy.get('#email').type(registerData.email);
        cy.get('#password').type(registerData.password);
        cy.get('#password-confirmation').type(registerData.password);
        cy.get(":checkbox").check();
        cy.get('button').click();
        cy.url().should('include', '/register')
    })

    it('try registration without last name', () => {
        cy.get('#first-name').type(registerData.firstName);
        cy.get('#last-name').clear();
        cy.get('button').click();
        cy.url().should('include', '/register')
    })

    it('try registration without email', () => {
        cy.get('#last-name').type(registerData.lastName);
        cy.get('#email').clear();
        cy.get('button').click();
        cy.url().should('include', '/register')
    })

    it('try registration without password', () => {
        cy.get('#email').type(registerData.email);
        cy.get('#password').clear();
        cy.get('#password-confirmation').clear();
        cy.get('button').click();
        cy.url().should('include', '/register')
    })

    it('try registration without terms and conditions accepted', () => {
        cy.get('#password').type(registerData.password);
        cy.get('#password-confirmation').type(registerData.password);
        cy.get(":checkbox").uncheck();
        cy.get('button').click();
        cy.url().should('include', '/register')
    })

    it('try registration with invalid email - without @', () => {
        cy.get('#email').clear().type('dijanagmail.com');
        cy.get(":checkbox").check();
        cy.get('button').click();
        cy.url().should('include', '/register')
    })

    it('try registration with invalid email - without .', () => {
        cy.get('#email').clear().type('dijana@gmailcom');
        cy.get('button').click();
        cy.url().should('include', '/register')
    })

    it('try registration with invalid password - too short', () => {
        cy.get('#email').clear().type(registerData.email);
        cy.get('#password').clear().type('Test1');
        cy.get('#password-confirmation').clear().type('Test1');
        cy.get('button').click();
        cy.url().should('include', '/register')
    })

    it('try registration with invalid password - without digits', () => {
        cy.get('#password').clear().type('TestTest');
        cy.get('#password-confirmation').clear().type('TestTest');
        cy.get('button').click();
        cy.url().should('include', '/register')
    })

    it('register with valid data', () => {
        cy.get('#first-name').clear().type(registerData.firstName);
        cy.get('#last-name').clear().type(registerData.lastName);
        cy.get('#email').clear().type(registerData.email);
        cy.get('#password').clear().type(registerData.password);
        cy.get('#password-confirmation').clear().type(registerData.password);
        cy.get(":checkbox").check();
        cy.get('button').click();
        cy.url().should('not.include', '/register')
    })
})