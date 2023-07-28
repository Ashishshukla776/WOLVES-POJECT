describe(`PostAnalytics API`, () => {
    before(() => {
        cy.login()
    })
    const requestBody = (payload) => {
        let reqBody = {
            matches: payload.hasOwnProperty("matches") ? payload.match : [{
                id: payload.hasOwnProperty("id") ? payload.id : "647473c440a529715cf6dbc0",
                matchName: payload.hasOwnProperty("matchName") ? payload.matchName : "ars-vs-wol-28may-2023",
                assetsId: payload.hasOwnProperty("assetsId") ? payload.assetsId : 1590878
            }],
            page: payload.hasOwnProperty("page") ? payload.page : "matchListing",
            club: payload.hasOwnProperty("club") ? payload.club : "Wolves",
        }
        return reqBody
    };

    const request = (data) => {
        return cy.request({
            method: "POST",
            url: "https://stageapi.swanbay.tv/v1/analytics/postanalytics",
            headers: {
                Authorization: Cypress.env("apiToken"),
            },
            body: data,
            failOnStatusCode : false
        })
    }
    context(`Success test case of PostAnalytics API`, () => {
        it(`postanalytics on matchListing page`, () => {
            let req = requestBody({})
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 200)
                expect(body).has.property("success", true)
                expect(body).has.property("data", true)
                expect(body).has.property("message", "Successfully saved analytics logs in SQS.")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`postanalytics on match-plus page`, () => {
            let req = requestBody({
                page: "Match+"
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 200)
                expect(body).has.property("success", true)
                expect(body).has.property("data", true)
                expect(body).has.property("message", "Successfully saved analytics logs in SQS.")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`postanalytics on Stats-plus page`, () => {
            let req = requestBody({
                page: "Stats+"
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 200)
                expect(body).has.property("success", true)
                expect(body).has.property("data", true)
                expect(body).has.property("message", "Successfully saved analytics logs in SQS.")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`postanalytics on Players-plus page`, () => {
            let req = requestBody({
                page: "Players+"
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 200)
                expect(body).has.property("success", true)
                expect(body).has.property("data", true)
                expect(body).has.property("message", "Successfully saved analytics logs in SQS.")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`postanalytics on Timeline-plus page`, () => {
            let req = requestBody({
                page: "Timeline+"
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 200)
                expect(body).has.property("success", true)
                expect(body).has.property("data", true)
                expect(body).has.property("message", "Successfully saved analytics logs in SQS.")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })
    })

    context(`Failure test case of PostAnalytics API`, () => {
        it(`When required field are not provided`, () => {
            let req = {}
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 400)
                expect(body).has.property("success", false)
                expect(body).has.property("message", "Please provide required field.")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`When required field left blank`, () => {
            let req = requestBody({
                page: "",
                club: ""
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 400)
                expect(body).has.property("success", false)
                expect(body).has.property("message", "Please provide required field.")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })
    })
})
