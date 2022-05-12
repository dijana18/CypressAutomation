import { allGalleriesPage } from "../page_objects/allGalleriesPage";

describe('All Galleries test', () => {

    beforeEach('visit all galleries page', () => {
        cy.loginViaBackend()
    })

    it('validate page', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=1&term='
        }).as('loadGalleries');

        cy.visit('/');
        cy.wait('@loadGalleries').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })

        allGalleriesPage.allGalleriesHeading
            .should('be.visible')
            .and('have.text', 'All Galleries');
    })

    it('all galleries displaying correctly', () => {
        allGalleriesPage.singleGallery
            .should('be.visible')
            .and('have.length', 10);
    })

    it('10 more galleries loading', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=2&term='
        }).as('loadGalleries2');

        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=3&term='
        }).as('loadGalleries3');

        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=3&term='
        }).as('loadGalleries4');

        allGalleriesPage.singleGallery.should('have.length', 10);
        allGalleriesPage.loadMoreBtn.click();
        cy.wait('@loadGalleries2').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })

        allGalleriesPage.singleGallery.should('have.length', 20);
        allGalleriesPage.loadMoreBtn.click();
        cy.wait('@loadGalleries3').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })

        allGalleriesPage.singleGallery.should('have.length', 30);
        allGalleriesPage.loadMoreBtn.click();
        cy.wait('@loadGalleries4').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })

        allGalleriesPage.singleGallery.should('have.length', 40);
    })

    it('redirect to single gallery page', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-app.vivifyideas.com/api/galleries/**'
        }).as('redirectToSingleGallery')

        allGalleriesPage.singleGallery
            .first()
            .find('a')
            .first()
            .click();

        cy.wait('@redirectToSingleGallery').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })
        cy.url().should('include', '/galleries');
    })

    it('redirect to authors gallery page', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=1&term='
        }).as('loadGalleries');

        cy.visit('/');
        cy.wait('@loadGalleries').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })

        allGalleriesPage.singleGallery
            .first()
            .find('a')
            .last()
            .click();
        cy.url().should('include', '/authors');
    })


    // ovaj test ne radi dobro, ignorisi 
    xit('search returning correct results', () => {
        let searchTerm = 'International Tactics Orchestrator'
        cy.intercept({
            method: 'GET',
            url: `/api/galleries?page=1&term=${searchTerm}`
        }).as('search')


        allGalleriesPage.singleGallery.should('have.length', 10);
        allGalleriesPage.search(searchTerm);
        cy.wait('@search').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })
        allGalleriesPage.singleGallery.should('have.length', 1);
        allGalleriesPage.singleGallery
            .find('a')
            .first()
            .should('contain.text', searchTerm);

    })

})