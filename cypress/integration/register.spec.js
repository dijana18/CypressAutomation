import { faker } from '@faker-js/faker';

describe('test register', () => {
    let registerData = {
        firstName: '',
        lastName: '',
        randomEmail: '',
        password: ''
    
    }
    
    beforeEach(() =>{
        registerData.firstName = faker.name.firstName();
        registerData.lastName = faker.name.lastName();
        registerData.randomEmail = faker.internet.email();
        registerData.password = faker.internet.password();
        
    })

    it('register without first name', () => {
        cy.visit('/register');
        cy.url().should('include','register');
        cy.get('#last-name').type('Nestorovic');
        cy.get('#email').type(registerData.randomEmail);
        cy.get('#password').type('Test123456!');
        cy.get('#password-confirmation').type('Test123456!');
        cy.get(":checkbox").check();
        cy.get('button').click();
        cy.url().should('include','/register')
    })

    it('register with valid data', () => {
        cy.visit('/register');
        cy.url().should('include','register');
        cy.get('#first-name').type(registerData.firstName);
        cy.get('#last-name').type(registerData.lastName);
        cy.get('#email').type(registerData.randomEmail);
        cy.get('#password').type(registerData);
        cy.get('#password-confirmation').type('Test123456!');
        cy.get(":checkbox").check();
        cy.get('button').click();
        cy.url().should('not.include','/register')
    })
})