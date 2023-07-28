describe(`getCatche API`, () => {
    before(() => {
        cy.login()
    })
    const requestBody = (payload) => {
        let reqBody = {
            // data: payload.hasOwnProperty("data") ? payload.data : "ars-vs-wol-28may-2023",
            club: payload.hasOwnProperty("club") ? payload.club : "Wolves",
            teamName :payload.hasOwnProperty("teamName") ? payload.teamName : "Wolverhampton Wanderers"
        }
        return reqBody
    };
   
    const request = (bodyItem) => {
        return cy.request({
            method: "POST",
            url: "https://stageapi.swanbay.tv/v1/catche/getCatche",
            headers: {
                Authorization: Cypress.env("apiToken"),
            },
            body: bodyItem,
            failOnStatusCode : false
        })
    }
    context(`Success test case of getCatche`, () => {
        it(`postanalytics on matchListing page`, () => {
            let req = requestBody({})
            request(req).then(({ body }) => {
                cy.log(JSON.stringify)
                // expect(body).has.property("status", 200)
                // expect(body).has.property("success", true)
                // body.data.match.forEach((ele)=>{
                //     expect(ele).has.property("_id")
                //     expect(ele).has.property("title")
                //     expect(ele).has.property("date")
                //     expect(ele).has.property("score")
                //     expect(ele).has.property("assetsId")
                //     expect(ele).has.property("homeTeams")
                //     expect(ele).has.property("homeTeamDisplayName")
                //     expect(ele).has.property("awayTeamDisplayName")
                //     expect(ele).has.property("awayTeams")
                //     expect(ele).has.property("season")
                //     expect(item).has.property("ground")
                //     expect(item).has.property("club")
                //     expect(item).has.property("gameOptaId")
                // })
                // body.data.Event.forEach((ele)=>{
                //     expect(ele).has.property("_id")
                //     expect(ele).has.property("displayName")
                //     expect(ele).has.property("sequence")
                //     expect(ele).has.property("value")
                //     expect(ele).has.property("type")
                // })
                // body.data.player.forEach((ele)=>{
                //     expect(ele).has.property("_id")
                //     expect(ele).has.property("player")
                //     expect(ele).has.property("sequence")
                //     expect(ele).has.property("status")
                //     expect(ele).has.property("teamName")
                //     expect(ele).has.property("playedOptaId")
                //     ele.images.forEach(item=>{
                //         expect(item).has.property("name")
                //         expect(item).has.property("sort_order")
                //         expect(item).has.property("isDefault")
                //         expect(item).has.property("url")
                //         expect(item).has.property("_id")
                //     })
                // })
                // body.data.Team.forEach((ele)=>{
                //     expect(ele).has.property("_id")
                //     expect(ele).has.property("team")
                //     expect(ele).has.property("club")
                //     expect(ele).has.property("status")
                //     ele.images.forEach(item=>{
                //         expect(item).has.property("name")
                //         expect(item).has.property("sort_order")
                //         expect(item).has.property("isDefault")
                //         expect(item).has.property("url")
                //         expect(item).has.property("_id")
                //     })
                // })
                // expect(body).has.property("message")
                // expect(body).has.property("fetechedFrom")
            })
        })
    })

    context(`Failure test case of getCatche`, () => {
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
                // data: "",
                club: "",
                teamName:""
            })
            request(req).then(({ body }) => {
                cy.log(JSON.stringify(body))
                expect(body).has.property("status", 400)
                expect(body).has.property("success", false)
                expect(body).has.property("message", "Please provide required field")
                expect(body).has.property("fetechedFrom", "Mongo")
            })
        })

        it(`data, teamName and club should be string data-type`, () => {
            let req = requestBody({
                // data: 121233,
                club: 2112323,
                teamName:123456
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
                data: "abcvscba",
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