const Locators = require("../fixtures/Locators.json")

describe ("Gradebook filter", ()=>{

    let email = "kalabaster@live.com"
    let password = "123456789"
    let title = "random"
    let prof_name = "john"

    beforeEach("Login user", ()=>{
        cy.Login(email, password)
    })
    it("Search filter with gradebook title", ()=>{
        cy.get(Locators.Filter.gradebook_filter).type(title)
        cy.get(Locators.Filter.search).eq(0).click()
        cy.get(Locators.Filter.gradebook_list).should("contain", title)
    })
    it("Search gradebooks by professor name", ()=>{
        cy.get(Locators.Filter.gradebook_filter).type(prof_name)
        cy.get(Locators.Filter.search).eq(0).click()
        cy.get("tbody").should("not.be.visible")
    })
    it("Pagination gradebooks, first page", ()=>{
        cy.get(Locators.Filter.previous_button).eq(1).should("be.disabled")
        cy.get(Locators.Filter.next_button).eq(2).should("not.be.disabled")     
    })
    it("Pagination gradebooks, second page", ()=>{
        cy.get(Locators.Filter.next_button).eq(2).click()
        cy.get(Locators.Filter.previous_button).eq(1).should("not.be.disabled")
        cy.get(Locators.Filter.next_button).eq(2).should("not.be.disabled")
    })
    //it.only("No pagination", ()=>{
    //    cy.get(Locators.Filter.previous_button).eq(1).should("be.disabled")
    //   cy.get(Locators.Filter.next_button).eq(2).should("be.disabled")
    //})


})