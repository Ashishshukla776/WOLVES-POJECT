describe(`searchAssetsByEvent API`, () => {
    before(() => {
        cy.login()
    })
    const requestBody = (payload) => {
        let reqBody = {
            events: payload.hasOwnProperty("events") ? payload.events : "( payload.value:\"firsthalfstart\")AND (payload.additionalProperties.min:0)AND (assetId:1590878)",
            club: payload.hasOwnProperty("club") ? payload.club : "Wolves",
            token :payload.hasOwnProperty("token") ? payload.token : null,
            assetsId: payload.hasOwnProperty("assetsId") ? payload.assetsId : [1590878],

        }
        return reqBody
    };

    const request = (bodyItem) => {
        return cy.request({
            method: "POST",
            url: "https://stageapi.swanbay.tv/v1/players/searchAssetsByEvent",
            headers: {
                Authorization: Cypress.env("apiToken"),
            },
            body: bodyItem,
            failOnStatusCode : false
        })
    }
    context(`Success test case of searchAssetsByEvent`, () => {
        it(`postanalytics on matchListing page`, () => {
            let req = requestBody({})
            request(req).then(({ body }) => {
                expect(body).has.property("status", 200)
                expect(body).has.property("success", true)
                expect(body).has.property("message")
                expect(body).has.property("fetechedFrom")
                expect(body).has.property("data")
            })
        })
    })

    context(`Failure test case of searchAssetsByEvent`, () => {
        it(`When required field are not provided`, () => {
            let req = {}
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 400)
                expect(body).has.property("success", false)
                expect(body).has.property("message", "Please provide required field")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`When required field left blank`, () => {
            let req = requestBody({
                events: "",
                club: "",
                token:"",
                assetsId:""
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 400)
                expect(body).has.property("success", false)
                expect(body).has.property("message", "Please provide required field")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`events, token and club should be string data-type`, () => {
            let req = requestBody({
                data: 121233,
                club: 2112323,
                token:12345
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 400)
                expect(body).has.property("success", false)
                expect(body).has.property("message", "Club and Data should be strings.")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`when events name is inavild`, () => {
            let req = requestBody({
                events: "abc-vs-cba-28july-2023",
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 400)
                expect(body).has.property("success", false)
                expect(body).has.property("message", "Data not found.")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`when club name is inavild`, () => {
            let req = requestBody({
                club: "abccba"
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 400)
                expect(body).has.property("success", false)
                expect(body).has.property("message", "Data not found.")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`when assetsId should be number`, () => {
            let req = requestBody({
                assetsId: ["abccba"]
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