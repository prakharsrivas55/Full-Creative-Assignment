/// <reference types="cypress" />
describe("CY Assignment 1", function () {

    beforeEach(function () {
        cy.fixture('Locator.json').then(function (mylocator) {
            this.mylocator = mylocator
        })
        cy.fixture('data.json').then(function (data) {
            this.data = data
        })
    })

    it('Assignment', function () {

    cy.open_trello_website()

    //Login in trello
    cy.loginPage(this.mylocator,this.data)

    //Create Board
    cy.get(this.mylocator.Create_btn).click()
    cy.get(this.mylocator.Create_board_btn).click()
    cy.get(this.mylocator.Board_title_loc).type('My Board{enter}')

    //Add List A and List B
    cy.get(".list-name-input").type('List A{enter}');
    cy.get(".list-name-input").type('List B{enter}');

    //Adding card in List A abd List B
    cy.add_card(this.mylocator)

    //Drag card from List A to List B
    cy.get('.list-card-title').eq(0).drag('.js-card-title',{force:true})

    //Getting x and y coordinates of moved card
    cy.get('.list-card-title.js-card-name').eq(1).should('contain',"testing").then(($card) => {
        const { x, y } = $card[0].getBoundingClientRect();
        expect(x).to.be.greaterThan(0);
        expect(y).to.be.greaterThan(0);
      })     
    
    //Logout from the application
    cy.logout(this.mylocator)
    })
})