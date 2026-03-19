/// <reference types="cypress" />

it("Working with APIs...", () => {
    //intecepting the tags
    //sooooo many overloads
    //if the response is short, could pass an object here directly, orrr use a fixture
    cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/tags', {fixture: 'tags.json'}).as('mockTags') 
    
    //intecepting the posts
    cy.intercept('GET', '**/articles?limit=10&offset=0', {fixture: 'articles.json'}).as('mockArticles')
                        //any url that matches this

    cy.intercept('GET', '**/articles**', {fixture: 'articles.json'}).as('mockArticlesGeneric')
                        //any url that matches this and any property

    //when using mocks, define them before doing any navigation
    cy.loginToApplication('bobson@bob.com', 'passwordson')
})


it.only("Changing the response...", () => {
    //get the request itself
    cy.intercept('GET', '**/articles**', req => {
        //let the response continue
        req.continue( res => { 
            //change whatever you need in the response
            res.body.articles[0].favoritesCount = 1000000000
            res.send(res.body) //change to send this modified body
        })
    }).as('changeLikes')

    
    cy.loginToApplication('bobson@bob.com', 'passwordson')
    cy.get('app-favorite-button').eq(0).should('contain.text', '1000000000')
})