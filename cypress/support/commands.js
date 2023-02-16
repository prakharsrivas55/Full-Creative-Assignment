require("@4tw/cypress-drag-drop");
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
})
Cypress.Commands.add('open_trello_website', () => {
    cy.visit('https://trello.com/');
    cy.url().should('include', 'https://trello.com/')  
})
Cypress.Commands.add('loginPage', (Locator,data) => {
    cy.get(Locator.Login_btn).click();
    cy.get(Locator.Username_loc).type(data.Email);
    cy.get(Locator.Continue_btn).click()
    cy.wait(1000)
    cy.origin("https://id.atlassian.com/", { args: [Locator,data]},([Locator,data]) => {
        cy.get(Locator.Password_loc).type(data.Password);
        cy.get(Locator.Login_submit_btn).click();
   
    })
})
Cypress.Commands.add('add_card', (Locator) => {
    cy.get(Locator.add_card).eq(0).click()
    cy.get(Locator.message).first().wait(1000).type('testing')
    cy.get(".cc-controls-section>input").click()
    cy.get(Locator.add_card).eq(1).click()
    cy.get(Locator.message).type('trello')
    cy.get(".cc-controls-section>input").click()
    cy.wait(2000)
})
Cypress.Commands.add('logout', (Locator) => {
    cy.get(Locator.Profile_btn).click()
    cy.get(Locator.Logout_btn).click()
    cy.get("#logout-submit").click()
})


