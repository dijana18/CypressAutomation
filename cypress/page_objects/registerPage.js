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
        return cy.get('button[class="btn btn-custom"]')
    }

    get heading() {
        return cy.get('h1');
    }

    get errorMsg() {
        return cy.get('p[class="alert alert-danger"]');
    }

    register(firstName, lastName, email, password, passwordConfirmed) {
        this.firstNameInput.type(firstName)
        this.lastNameInput.type(lastName)
        this.emailInput.type(email)
        this.passwordInput.type(password)
        this.passwordConfirmationInput.type(passwordConfirmed)
        this.checkBox.check()
        this.submitBtn.click()
    }

    fillRegisterForm(firstName, lastName, email, password, passwordConfirmed) {
        this.firstNameInput.type(firstName)
        this.lastNameInput.type(lastName)
        this.emailInput.type(email)
        this.passwordInput.type(password)
        this.passwordConfirmationInput.type(passwordConfirmed)
    }
}

export const registerPage = new RegisterPage()