class RegisterPage {

    get firstNameInput() {
        return cy.get('#first-name')
    }

    get lastNameInput() {
        return cy.get('#last-name')
    }

    get emailInput() {
        return cy.get('#email')
    }

    get passwordInput() {
        return cy.get('#password')
    }

    get passwordConfirmationInput() {
        return cy.get('#password-confirmation')
    }

    get checkBox() {
        return cy.get(':checkbox')
    }

    get submitBtn() {
        return cy.get('button[type="submit"]')
    }

    register(firstName, lastName, email, password){
        this.firstNameInput.type(firstName)
        this.lastNameInput.type(lastName)
        this.emailInput.type(email)
        this.passwordInput.type(password)
        this.passwordConfirmationInput.type(password)
        this.checkBox.check()
        this.submitBtn.click()
    }
}

export const registerPage = new RegisterPage()