class LoginPage {
    get emailInput() {
        return cy.get('#email');
    }

    get passwordInput() {
        return cy.get('#password')
    }

    get submitBtn() {
        return cy.get('button[type="submit"]')
    }

    login(email,pass) {
        this.emailInput.type(email)
        this.passwordInput.type(pass)
        this.submitBtn.click();
    }


}

export const loginPage = new LoginPage();