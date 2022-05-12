import { createGalleryPage } from "../page_objects/createGalleryPage";
import { navigation } from "../page_objects/navigation";

describe('Create gallery', () => {

    let galleryId;

    beforeEach('open Create Gallery page', () => {
        cy.loginViaBackend();
        cy.visit('/create')
    })

    it('validate page', () => {
        createGalleryPage.heading.should('be.visible')
            .and('have.text', 'Create Gallery');
        createGalleryPage.titleInput.should('exist');
        createGalleryPage.descriptionInput.should('be.visible');
        createGalleryPage.imageUrlInput.should('be.visible');
        createGalleryPage.addImageBtn.should('be.visible');
        createGalleryPage.submitBtn.should('be.visible')
            .and('have.css', 'color', 'rgb(255, 255, 255)');
        createGalleryPage.cancelBtn.should('be.visible')
            .and('have.css', 'background-color', 'rgb(72, 73, 75)');
    })

    it('try to create gallery with invalid image url', () => {

        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGalleryInvalidData');

        createGalleryPage.createNewGallery(
            'moja galerija 100',
            'neki opis',
            'https://images.all-free-download.com/images/graphiclarge/animal_big_carnivore_263240'
        )
        cy.wait('@createGalleryInvalidData').then(interception => {
            console.log(interception);
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.body.message).eq('The given data was invalid.')
        })
    })

    it('try to create gallery with too short title', () => {

        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGalleryInvalidData');

        createGalleryPage.createNewGallery(
            '1',
            'test',
            'https://www.norwegiantransfer.com/images/tours/5/pic5e1f88d28313a1.22841671.jpg'
        )
        cy.wait('@createGalleryInvalidData').then(interception => {
            console.log(interception);
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.body.message).eq('The given data was invalid.')
        })
    })
    it('if only one image url left, it could not be deleted', () => {

        createGalleryPage.titleInput.type('blabla')
        createGalleryPage.descriptionInput.type('testtest')
        createGalleryPage.imageUrlInput.type('https://www.norwegiantransfer.com/images/tours/5/pic5e1f88d28313a1.22841671.jpg')
        createGalleryPage.addImageBtn.click()
        createGalleryPage.imageUrlInput.last().type('this will be deleted')
        //assert that delete button for first input exists
        cy.get('.input-group').first().find('.fa-trash').should('exist')
        //delete last url
        cy.get('.input-group').last().find('.fa-trash').click()
        //assert that delete button for first input no longer exists
        cy.get('.input-group').first().find('.fa-trash').should('not.exist')

    })

    it('create gallery with valid data', () => {

        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery');

        createGalleryPage.createNewGallery(
            'Cappadocia',
            'balloons',
            'https://www.norwegiantransfer.com/images/tours/5/pic5e1f88d28313a1.22841671.jpg'
        )

        cy.wait('@createGallery').then(interception => {
            galleryId = interception.response.body.id;
            expect(interception.response.statusCode).eq(201);

            cy.visit(`/galleries/${galleryId}`);
            cy.contains('Cappadocia').should('exist');
        })
    })

    it('visit specific gallery', () => {
        cy.visit(`/galleries/${galleryId}`);
        cy.contains('Cappadocia').should('exist');
    })

    it('create gallery with two images', () => {

        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery');

        createGalleryPage.createNewGalleryWithTwoImages(
            'Cappadocia 2 images',
            'balloons',
            'https://www.norwegiantransfer.com/images/tours/5/pic5e1f88d28313a1.22841671.jpg',
            'https://ourlifeourtravel.com/wp-content/uploads/2019/01/cappadocia-765498_1280.jpg'
        )

        cy.wait('@createGallery').then(interception => {
            galleryId = interception.response.body.id;
            expect(interception.response.statusCode).eq(201);

            cy.visit(`/galleries/${galleryId}`);
            cy.contains('Cappadocia').should('exist');
        })
    })

})