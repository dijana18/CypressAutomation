import { faker } from '@faker-js/faker';

describe('test register', () => {
    let registerData = {
        firstName: '',
        lastName: '',
        randomEmail: '',
        password: ''
    
    }
    before('visit register page', () =>{
        cy.visit('/register');
        cy.url().should('include','/register')
    })
    
    beforeEach(() =>{
        registerData.firstName = faker.name.firstName();
        registerData.lastName = faker.name.lastName();
        registerData.randomEmail = faker.internet.email();
        registerData.password = faker.internet.password();
        
    })

    it('register without first name', () => {
        cy.get('#last-name').type('Nestorovic');
        cy.get('#email').type(registerData.randomEmail);
        cy.get('#password').type('Test123456!');
        cy.get('#password-confirmation').type('Test123456!');
        cy.get(":checkbox").check();
        cy.get('button').click();
        cy.url().should('include','/register')
    })

    it('register without last name', () => {
        cy.get('#first-name').type('Dijana');
        cy.get('#last-name').clear();
        cy.get('button').click();
        cy.url().should('include','/register')
    })

    it('register without email', () => {
        cy.get('#last-name').type('Nestorovic');
        cy.get('#email').clear();
        cy.get('button').click();
        cy.url().should('include','/register')
    })

    it('register without password', () => {
        cy.get('#email').type(registerData.randomEmail);
        cy.get('#password').clear();
        cy.get('#password-confirmation').clear();
        cy.get('button').click();
        cy.url().should('include','/register')
    })

    it('register without terms and conditions accepted', () => {
        cy.get('#password').type('Test123456!');
        cy.get('#password-confirmation').type('Test123456!');
        cy.get(":checkbox").uncheck();
        cy.get('button').click();
        cy.url().should('include','/register')
    })

    it('register with invalid email - without @', () => {
        cy.get('#email').clear().type('dijanagmail.com');
        cy.get(":checkbox").check();
        cy.get('button').click();
        cy.url().should('include','/register')
    })

    it('register with invalid email - without .', () => {
        cy.get('#email').clear().type('dijana@gmailcom');
        cy.get('button').click();
        cy.url().should('include','/register')
    })

    it('register with invalid password - too short', () => {
        cy.get('#email').clear().type(registerData.randomEmail);
        cy.get('#password').clear().type('Test1');
        cy.get('#password-confirmation').clear().type('Test1');
        cy.get('button').click();
        cy.url().should('include','/register')
    })

    it('register with invalid password - without digits', () => {
        cy.get('#password').clear().type('TestTest');
        cy.get('#password-confirmation').clear().type('TestTest');
        cy.get('button').click();
        cy.url().should('include','/register')
    })

    it('register with valid data', () => {
        cy.get('#first-name').clear().type(registerData.firstName);
        cy.get('#last-name').clear().type(registerData.lastName);
        cy.get('#email').clear().type(registerData.randomEmail);
        cy.get('#password').clear().type('Test123456!');
        cy.get('#password-confirmation').clear().type('Test123456!');
        cy.get(":checkbox").check();
        cy.get('button').click();
        cy.url().should('not.include','/register')
    })
})