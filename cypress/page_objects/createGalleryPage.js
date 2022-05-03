class CreateGalleryPage {
    get titleInput() {
        return cy.get('#title');
    }

    get descriptionInput() {
        return cy.get('#description');
    }

    get imageUrlInput() {
        return cy.get('input[type="url"]')
    }

    get submitBtn() {
        return cy.get('button[type="submit"]');
    }

    get cancelBtn() {
        return cy.get('button[type="submit"]');
    }

    createNewGallery(title, description, imageUrl) {
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imageUrlInput.type(imageUrl);
        this.submitBtn.eq(0).click();
    }

}

export const createGalleryPage = new CreateGalleryPage();