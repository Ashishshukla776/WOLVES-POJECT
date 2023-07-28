describe(`Navigate the stats-plus page`,()=>{
    const matchSel = require('../../selectors/matchPlus.sel')
    before(()=>{
        cy.visit('http://localhost:4200')
    })
    it(``,()=>{
        /** check the all functionality of match listing page. Here we can select
            single match and multiple match or whole season to watch the event
        */
       
       // single match selection
        cy.get(matchSel.chooseMatch).check({force: true})
        cy.get('#2293180').click({force: true})
        cy.get(':nth-child(2) > .btn').should("have.contain","Stats+").click()

        cy.get('#goalhome').click()
        cy.get('#goalall')
        cy.get('#goalaway')

        cy.get('#targethome')
        cy.get('#targetall')
        cy.get('#targetaway')

        cy.get('#shottargethome')
        cy.get('#shottargetall')
        cy.get('#shottargetaway')

        cy.get('#savehome')
        cy.get('#saveall')
        cy.get('#saveaway')

        cy.get('#directkickhome')
        cy.get('#directkickall')
        cy.get('#directkickaway')

        cy.get('#cornerhome')
        cy.get('#cornerall')
        cy.get('#corneraway')

        cy.get('#crosseshome')
        cy.get('#crossesall')
        cy.get('#crossesaway')

        cy.get('#foulhome')
        cy.get('#foulall')
        cy.get('#foulaway')

        cy.get('#assistedhome')
        cy.get('#assistedall')
        cy.get('#assistedaway')
        
    })
})