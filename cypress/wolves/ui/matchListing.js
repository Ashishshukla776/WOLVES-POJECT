describe(`Navigate the matchlisting page`,()=>{
    before(()=>{
        cy.visit('http://localhost:4200')
    })
    it(``,()=>{
        /** check the all functionality of match listing page. Here we can select
            single match and multiple match or whole season to watch the event
        */
       
       // single match selection
        cy.get('input[name="group1"]').check({force: true})
        // cy.get('#2292942').click({force: true})
        // cy.get('.report-btn-wrap > :nth-child(1)')
        // cy.get('.report-btn-wrap > :nth-child(2)')
        // cy.get('.report-btn-wrap > :nth-child(3)')
        // cy.get('.report-btn-wrap > :nth-child(4)')
        // // multiple match selection
        // cy.get('#WestHam-Wolverhampton-22-23').click({force: true})
        // cy.get('#Wolverhampton-Manchester22-23').click({force: true})
        // // whole season selection
        // cy.get('input[name="group2"]').check({force: true})
        // cy.get('input[name="group3"]').check({force: true})
        // cy.get('.btn-fixed > :nth-child(1)')
        // cy.get('input[name="group4"]').check({force: true})
        // cy.get('.btn-fixed > :nth-child(2)')
    })
})