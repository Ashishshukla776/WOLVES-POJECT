describe(`Navigate the stats-plus page`,()=>{
    const matchSel = require('../../selectors/matchPlus.sel')
    before(()=>{
        cy.visit('http://localhost:4200')
    })
    it(`Check the single player event`,()=>{
        cy.get(matchSel.chooseMatch).check({force: true})
        cy.get('#2293180').click({force: true})
        cy.get(':nth-child(3) > .btn').should("have.contain","Player+").click()
        cy.get('#heading0').click()
        cy.get('.card #collapse0 input[value="Foul"]').click({force: true})
        cy.get('#collapse0 > .card-body .text-center > .btn')   //play btn
        //play firstHalf all event
        cy.get('#collapse0 > .card-body > .player-timeline > .timeline-game-btn > :nth-child(1) > p')
            .should('have.contain',"Please click to view this player’s action from the first half")
        cy.get('#activefirsthalfJosé\ Sá').should('have.contain'," Play First Half Game")
        
         //play secondHalf all event  
         cy.get('#collapse0 > .card-body > .player-timeline > .timeline-game-btn > :nth-child(2) > p')
            .should('have.contain',"Please click to view this player’s action from the first half")   
        cy.get('#activesecondhalfJosé\ Sá').should('have.contain'," Play First Half Game")  
        
        //Play single event of firstHalf
        cy.get('#josé\ sáfirst_halfsave29 > img')

        //Play single event of secondHalf
        cy.get('#josé\ sásecond_halfsave63 > img')

        // Play highlight
        cy.get('#autohighlight')

        // play full match
        cy.get('#watchGame').click()
        cy.get('#first_half')
        cy.get('#second_half')
    })
})