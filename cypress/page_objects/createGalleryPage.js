class CreateGalleryPage {
    get titleInput() {
        return cy.get('#title');
    }

    get descriptionInput() {
        return cy.get('#description');
    }

    get imageUrlInput() {
        return cy.get('.input-group');
    }

    get addImageBtn(){
        return cy.get('button[type="button"]').last();
    }

    get submitBtn() {
        return cy.get('.btn').first();
    }

    get cancelBtn() {
        return cy.get('.btn').last()
    }

    get heading() {
        return cy.get('h1')
    }

    createNewGallery(title, description, imageUrl) {
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imageUrlInput.type(imageUrl);
        this.submitBtn.click();
    }

    createNewGalleryWithTwoImages(title, description, imageUrl1, imageUrl2) {
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imageUrlInput.type(imageUrl1);
        this.addImageBtn.click()
        this.imageUrlInput.last().type(imageUrl2)
        this.submitBtn.click();
    }
}

export const createGalleryPage = new CreateGalleryPage();