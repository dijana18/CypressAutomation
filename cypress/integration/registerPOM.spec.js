import { registerPage } from "../page_objects/registerPage";
import { faker } from '@faker-js/faker';

describe('test register POM', () => {
    let registerData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(20, true, /[A-Z]/, '123')
    
    }
    
    before('visit register page', () =>{
        cy.visit('/register');
        cy.url().should('include','/register')
    })


    it('register with valid data', () => {
       registerPage.register(
            registerData.firstName,
            registerData.lastName,
            registerData.email,
            registerData.password
            )
        cy.url().should('not.include','/register')
    })
})