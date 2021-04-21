const Locators = require("../fixtures/Locators.json")

describe("Create gradebook", ()=>{

    let email = "kalabaster@live.com"
    let password = "123456789"
    let title = "random"
    let professor_name = "marko jevtic"
    let wrongTitle = "a"

    beforeEach("Login and go to create gradebook page", ()=>{
        cy.Login(email, password)
        cy.get("h3").should("have.text", " All Gradebooks Page")
        cy.get(Locators.CreateGradebook.create_gradebook).eq(2).click()
        cy.url().should("contain", "/create-gradebook")
    })
    it("Create gradebook", ()=>{
        cy.get(Locators.CreateGradebook.gradebook_title).type(title)
        cy.get(Locators.CreateGradebook.professor_select).select(professor_name)
        cy.get(Locators.CreateGradebook.professor_select).should("have.value", 65)
        cy.get(Locators.CreateGradebook.submit_gradebook).click()
        cy.url().should("contain", "/gradebooks")
        cy.get(Locators.Header.myGradebook).eq(1).click()
        cy.wait(500)
        cy.Delete_gradebook()
    })
    it("Create gradebook without title", ()=>{
        cy.get(Locators.CreateGradebook.professor_select).select(professor_name)
        cy.get(Locators.CreateGradebook.submit_gradebook).click()
        cy.get(Locators.CreateGradebook.gradebook_alert).should("contain", "Message: The given data was invalid.")
    })
    it("Create gradebook without professor name", ()=>{
        cy.get(Locators.CreateGradebook.gradebook_title).type(title)
        cy.get(Locators.CreateGradebook.submit_gradebook).click()
        cy.get(Locators.CreateGradebook.gradebook_alert).should("contain", "Message: The given data was invalid.")
    })
    it("Create gradebook, title 1 character", ()=>{
        cy.get(Locators.CreateGradebook.gradebook_title).type(wrongTitle)
        cy.get(Locators.CreateGradebook.professor_select).select(professor_name)
        cy.get(Locators.CreateGradebook.submit_gradebook).click()
        cy.get(Locators.CreateGradebook.gradebook_alert).should("contain", "The title must be at least 2 characters.")
    })





})