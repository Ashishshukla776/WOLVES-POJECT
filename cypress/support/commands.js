const apiUrl = Cypress.env("apiUrl")
Cypress.Commands.add('login', () => {
    cy.request({
        method:"POST",
        url:`${apiUrl}/admin/login`,
        body:{
            "email": Cypress.env("email"),
            "password": Cypress.env("password")
        }
    }).then(({body})=>{
        let token = "Bearer " + body.data.token
        Cypress.env("apiToken",token)
    })
})