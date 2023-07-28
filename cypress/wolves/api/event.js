describe(`matches-event API`, () => {
    before(() => {
        cy.login()
    })
    const requestBody = (payload) => {
        let reqBody = {
            data: payload.hasOwnProperty("data") ? payload.data : "Wolves",
        }
        return reqBody
    };

    const request = (data) => {
        return cy.request({
            method: "POST",
            url: "https://stageapi.swanbay.tv/v1/matches/event",
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
                expect(body).has.property("message")
                expect(body).has.property("fetechedFrom")
                body.data.forEach(ele => {
                    expect(ele).has.property("_id")
                    expect(ele).has.property("displayName")
                    expect(ele).has.property("sequence")
                    expect(ele).has.property("value")
                    expect(ele).has.property("type")
                });
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
                data: ""
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 400)
                expect(body).has.property("success", false)
                expect(body).has.property("message", "Please provide required field.")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`data should be string data-type`, () => {
            let req = requestBody({
                data: 13434433
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 400)
                expect(body).has.property("success", false)
                expect(body).has.property("message", "Please provide required field.")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`when match name is inavild`, () => {
            let req = requestBody({
                data: "abc-vs-cba-28july-2023",
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 400)
                expect(body).has.property("success", false)
                expect(body).has.property("message", "Data not found.")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })
    })
})