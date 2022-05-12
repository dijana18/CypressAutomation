/// <reference types="Cypress" />
import { registerPage } from "../page_objects/registerPage";
import { faker } from '@faker-js/faker';

describe('test register POM', () => {
    
    let registerData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(20, true, /[A-Z]/, '123')
    }

    beforeEach('visit register page', () => {
        cy.visit('/register');
        cy.url().should('include', '/register')
    })

    it('register with invalid email - without domain', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('unsuccessfulregister');

        registerPage.heading.should('have.text', 'Register');

        registerPage.register(
            registerData.firstName,
            registerData.lastName,
            'test@gmail',
            registerData.password,
            registerData.password
        );
        cy.wait('@unsuccessfulregister').then(interception => {
            expect(interception.response.statusCode).eq(422)
        })

        registerPage.errorMsg.should('have.text', 'The email must be a valid email address.')
            .and('have.css', 'color', 'rgb(114, 28, 36)');
        cy.url().should('include', '/register');
    })

    it('register with invalid email - without .', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('unsuccessfulregister');

        registerPage.register(
            registerData.firstName,
            registerData.lastName,
            'test@gmailcom',
            registerData.password,
            registerData.password
        );
        cy.wait('@unsuccessfulregister').then(interception => {
            expect(interception.response.statusCode).eq(422)
        })

        registerPage.errorMsg.should('have.text', 'The email must be a valid email address.')
            .and('have.css', 'color', 'rgb(114, 28, 36)');
        cy.url().should('include', '/register');
    })

    it('register with invalid password - without digits', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('unsuccessfulregister');

        registerPage.register(
            registerData.firstName,
            registerData.lastName,
            registerData.email,
            'TestTest',
            'TestTest'
        );
        cy.wait('@unsuccessfulregister').then(interception => {
            expect(interception.response.statusCode).eq(422)
        })

        registerPage.errorMsg.should('have.text', 'The password format is invalid.')
            .and('have.css', 'color', 'rgb(114, 28, 36)');
        cy.url().should('include', '/register');
    })

    it('register with invalid password - too short', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('unsuccessfulregister');

        registerPage.register(
            registerData.firstName,
            registerData.lastName,
            registerData.email,
            'Test',
            'Test'
        );
        cy.wait('@unsuccessfulregister').then(interception => {
            expect(interception.response.statusCode).eq(422)
        })

        registerPage.errorMsg.should('have.text', 'The password must be at least 8 characters.')
            .and('have.css', 'color', 'rgb(114, 28, 36)');
        cy.url().should('include', '/register');
    })

    it('register with invalid confirmed password', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('unsuccessfulregister');

        registerPage.register(
            registerData.firstName,
            registerData.lastName,
            registerData.email,
            'TestTest1',
            'TestTest2'
        );
        cy.wait('@unsuccessfulregister').then(interception => {
            expect(interception.response.statusCode).eq(422)
        })

        registerPage.errorMsg.should('have.text', 'The password confirmation does not match.')
            .and('have.css', 'color', 'rgb(114, 28, 36)');
        cy.url().should('include', '/register');
    })

    it('register without terms and conditions accepted', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('unsuccessfulregister');

        registerPage.fillRegisterForm(
            registerData.firstName,
            registerData.lastName,
            registerData.email,
            'TestTest10',
            'TestTest10'
        );
        registerPage.submitBtn.click();
        cy.wait('@unsuccessfulregister').then(interception => {
            expect(interception.response.statusCode).eq(422)
        })
        registerPage.errorMsg.should('have.text', 'The terms and conditions must be accepted.');
        cy.url().should('include', '/register');
    })

    it('register with valid data', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('successfulregister');

        registerPage.register(
            registerData.firstName,
            registerData.lastName,
            registerData.email,
            registerData.password,
            registerData.password
        )
        cy.wait('@successfulregister').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })
        cy.url().should('not.include', '/register')
    })
})