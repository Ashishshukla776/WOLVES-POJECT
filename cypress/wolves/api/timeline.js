describe(`timeLinePlus API`, () => {
    const apiUrl = Cypress.env("apiUrl")
    before(() => {
        cy.login()
    })
    const requestBody = (payload) => {
        let reqBody = {
            data: payload.hasOwnProperty("data") ? payload.data : "ars-vs-wol-28may-2023",
            club: payload.hasOwnProperty("club") ? payload.club : "Wolves",
            // teamName :payload.hasOwnProperty("teamName") ? payload.teamName : "Wolverhampton Wanderers"
        }
        return reqBody
    };

    const request = (bodyItem) => {
        return cy.request({
            method: "POST",
            url: `${apiUrl}/v1/players/stats/games/timeLinePlus`,
            headers: {
                Authorization: Cypress.env("apiToken"),
            },
            body: bodyItem,
            failOnStatusCode : false
        })
    }

    context(`Success test case of timeLinePlus`, () => {
        it(`postanalytics on matchListing page`, () => {
            let req = requestBody({})
            request(req).then(({ body }) => {
                expect(body).has.property("status", 200)
                expect(body).has.property("success", true)
                expect(body).has.property("message")
                expect(body).has.property("fetechedFrom")
                expect(body.data).has.property("assetsId")
                body.data.FirstHalftimeLine.forEach((ele)=>{
                    expect(ele).has.property("teamName")
                    expect(ele).has.property("playerName")
                    expect(ele).has.property("event")
                    expect(ele).has.property("displayName")
                    expect(ele).has.property("startTime")
                    expect(ele).has.property("min")
                    expect(ele).has.property("sec")
                    expect(ele).has.property("isFistHalf")
                 
                })
                body.data.SecondHalftimeLine.forEach((ele)=>{
                    expect(ele).has.property("teamName")
                    expect(ele).has.property("playerName")
                    expect(ele).has.property("event")
                    expect(ele).has.property("displayName")
                    expect(ele).has.property("startTime")
                    expect(ele).has.property("min")
                    expect(ele).has.property("sec")
                    expect(ele).has.property("isFistHalf")
                 
                })
            })
        })
    })

    context(`Failure test case of timeLinePlus`, () => {
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

        it(`when team name is inavild`, () => {
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