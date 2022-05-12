class LoginPage {
    get emailInput() {
        return cy.get('#email');
    }

    get passwordInput() {
        return cy.get('#password')
    }

    get submitBtn() {
        return cy.get('button[class="btn btn-custom"]')
    }

    get loginHeading() {
        return cy.get('h1');
    }

    get errorMsg() {
        return cy.get('p[class="alert alert-danger"]');
    }

    login(email, pass) {
        this.emailInput.type(email)
        this.passwordInput.type(pass)
        this.submitBtn.click();
    }
}

export const loginPage = new LoginPage();