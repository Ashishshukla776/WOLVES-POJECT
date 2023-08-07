describe(`Navigate the timeline-plus page`,()=>{
    const matchSel = require('../../selectors/matchPlus.sel')
    before(()=>{
        cy.visit(Cypress.env("uiUrl"))
    })
    it(`Check the events of timeline-plus page`,()=>{

        cy.get(matchSel.chooseMatch).check({force: true})
        cy.get('#2293180').click({force: true})
        cy.get(':nth-child(4) > .btn').should("have.contain","Timeline+").click()
        cy.get(':nth-child(1) > .heading-timeline').should("have.contain","First Half")
        cy.get(':nth-child(2) > .heading-timeline').should("have.contain","Second Half")
        cy.get('#tab-1half > .row > .text-end').should("have.contain","Home")
        cy.get('#tab-1half > .row > .text-home').should("have.contain","Away")
        cy.get('#tab-1half > .timeline-centered > :nth-child(1) > .timeline-entry-inner > .timeline-label > .timeline-title').should("have.contain","Start")
        cy.get('#tab-1half > .timeline-centered > :nth-child(1) > .timeline-entry-inner > .timeline-label > :nth-child(2)').should("have.contain","0'0")
        cy.get('#first_halffirsthalfstart0').click()
        
        cy.get('#first_halfgranit\ xhakagoal10')
        cy.get('#tab-1half > .timeline-centered > :nth-child(2) > .timeline-entry-inner > .timeline-label > .timeline-title')
        cy.get('#tab-1half > .timeline-centered > :nth-child(2) > .timeline-entry-inner > .timeline-label > :nth-child(2)')
        cy.get('#tab-1half > .timeline-centered > :nth-child(2) > .timeline-entry-inner > .timeline-label > :nth-child(3)')
        cy.get('#first_halfgranit\ xhakagoal13')
        cy.get('#tab-1half > .timeline-centered > :nth-child(3) > .timeline-entry-inner > .timeline-label > .timeline-title')
        cy.get('#tab-1half > .timeline-centered > :nth-child(2) > .timeline-entry-inner > .timeline-label > :nth-child(2)')
        cy.get('#tab-1half > .timeline-centered > :nth-child(2) > .timeline-entry-inner > .timeline-label > :nth-child(3)')
    })
})