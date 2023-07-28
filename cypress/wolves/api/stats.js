describe(`statsPlus API`, () => {
    before(() => {
        cy.login()
    })
    const requestBody = (payload) => {
        let reqBody = {
            data: payload.hasOwnProperty("data") ? payload.data : "ars-vs-wol-28may-2023",
            club: payload.hasOwnProperty("club") ? payload.club : "Wolves",
        }
        return reqBody
    };

    const request = (bodyItem) => {
        return cy.request({
            method: "POST",
            url: "https://stageapi.swanbay.tv/v1/players/stats/games/statsPlus",
            headers: {
                Authorization: Cypress.env("apiToken"),
            },
            body: bodyItem,
            failOnStatusCode : false
        })
    }
    context(`Success test case of statsPlus`, () => {
        it(`postanalytics on matchListing page`, () => {
            let req = requestBody({})
            request(req).then(({ body }) => {
                expect(body).has.property("status", 200)
                expect(body).has.property("success", true)
                body.data.forEach((ele)=>{
                    expect(ele).has.property("home")
                    expect(ele).has.property("away")
                    expect(ele).has.property("homePercent")
                    expect(ele).has.property("awayPercent")
                    expect(ele).has.property("event")
                    expect(ele).has.property("value")
                    expect(ele).has.property("homeTeam") 
                    expect(ele).has.property("awayTeam")
                })
                expect(body).has.property("message")
                expect(body).has.property("fetechedFrom")
            })
        })
    })

    context(`Failure test case of statsPlus`, () => {
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
                data: "",
                club: ""
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 400)
                expect(body).has.property("success", false)
                expect(body).has.property("message", "Please provide required field")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`data and club should be string data-type`, () => {
            let req = requestBody({
                data: 121233,
                club: 2112323
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 400)
                expect(body).has.property("success", false)
                expect(body).has.property("message", "Club and Data should be strings.")
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
    })
})