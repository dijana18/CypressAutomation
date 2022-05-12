class Navigation {

    get loginButton() {
        return cy.get('a[href="/login"]')
    }

    get logoutButton() {
        return cy.get('a[class="nav-link nav-buttons"]').last()
    }

    get registerButton() {
        return cy.get('a[href="/register"]')
    }

    get createGalleryButton() {
        return cy.get('a[href="/create"]')
    }

    clickLoginButton() {
        this.loginButton.click()
    }

    clickLogoutButton() {
        this.logoutButton.click()
    }

    clickRegisterButton() {
        this.registerButton.click()
    }

    clickCreateGalleryButton() {
        this.createGalleryButton.click()
    }

}

export const navigation = new Navigation()