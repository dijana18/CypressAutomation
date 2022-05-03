class AllGalleriesPage {
    get searchInput() {
        return cy.get('input[type="text"]');
    }

    get filterBtn() {
        return cy.get('button[type="button"]')
    }

    filterBy(word) {
        this.searchInput.type(word);
        this.filterBtn.click();
    }
}

export const allGalleriesPage = new AllGalleriesPage();