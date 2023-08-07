describe(`Navigate the matchlisting page`,()=>{
    beforeEach(()=>{
        cy.visit(Cypress.env("uiUrl"))
    })
    it(`Check functionality of single & multiple match & whole season selection`,()=>{
        /** check the all functionality of match listing page. Here we can select
            single match and multiple match or whole season to watch the event
        */
       // single match selection
        cy.get('input[name="group1"]').check({force: true}).should("be.checked")
        cy.get('#2293180').check({force: true}).should("be.checked")
        cy.get(':nth-child(1) > .btn')
        cy.get(':nth-child(2) > .btn')
        cy.get(':nth-child(3) > .btn')
        cy.get(':nth-child(4) > .btn')
        // multiple match selection
        cy.get('#2293180').check({force: true}).should("be.checked")
        cy.get('#2293179').check({force: true}).should("be.checked")
        // whole season selection
        cy.get('input[name="group2"]').check({force: true}).should("be.checked")
        cy.get('input[name="group3"]').check({force: true}).should("be.checked")
        cy.get('.btn-fixed > :nth-child(1)')
        cy.get('input[name="group4"]').check({force: true}).should("be.checked")
        cy.get('.btn-fixed > :nth-child(2)')
    })

    it(`Check functionality of search box for opposition team`,()=>{
        // check single team selection functionality
        cy.get('#2293180').check({force: true}).should("be.checked")
        cy.get('input[role="combobox"]').click()   //search box
        cy.get('mat-option[role="option"]:nth-child(1)').click()  // search box item
        cy.get('#2293180').check({force: true}).should("be.checked")
        cy.get(':nth-child(1) > .btn')
        cy.get('.mat-chip-remove > .mat-icon').click()  //remove selection

        // check multiple team selection functionality

        cy.get('#2293180').check({force: true}).should("be.checked")
        cy.get('#2293179').check({force: true}).should("be.checked")
        cy.get('input[role="combobox"]').click()   //search box
        cy.get('mat-option[role="option"]:nth-child(1)').click() // search box item
        cy.get('input[role="combobox"]').click()
        cy.get('mat-option[role="option"]:nth-child(1)').click()
        cy.get('#2293180').check({force: true}).should("be.checked")
        cy.get('#2293159').check({force: true}).should("be.checked")
        cy.get('.btn-fixed > :nth-child(1)')
        cy.get('.btn-fixed > :nth-child(2)')
    })
})