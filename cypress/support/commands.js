Cypress.Commands.add('login', () => {
    cy.request({
        method:"POST",
        url:"https://stageapi.swanbay.tv/admin/login",
        body:{
            "email": "super@admin.com",
            "password": "admin@123"
        }
    }).then(({body})=>{
        let token = "Bearer " + body.data.token
        Cypress.env("apiToken",token)
    })
})