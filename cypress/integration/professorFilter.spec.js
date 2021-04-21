const Locators = require("../fixtures/Locators.json")

describe("Professors filter", ()=>{

    let email = "kalabaster@live.com"
    let password = "123456789"
    let prof_name = "marko"
    let prof_last_name = "jevtic"
    let gradebook = "edited title"

    beforeEach("Visit app and login", ()=>{
        cy.Login(email, password)
    })
    
    it("Visit professors link", ()=>{
        cy.get(Locators.Header.Professors).eq(3).click()
        cy.get(Locators.Header.All_professors).eq(0).click()
        cy.get(Locators.Professor.professor_title).should("have.text", "All Professors Page")
        cy.get(Locators.Header.Professors).eq(3).click()
        cy.get(Locators.Header.Create_professor).eq(1).click()
        cy.get("h3").should("have.text", "Create Professor")
    })
    it("Use professor filter, search by first name", ()=>{
        cy.get(Locators.Header.Professors).eq(3).click()
        cy.get(Locators.Header.All_professors).eq(0).click()
        cy.get(Locators.Professor.professor_title).should("have.text", "All Professors Page")
        cy.get(Locators.Professor.professor_search).type(prof_name)
        cy.get("tbody").should("contain", "marko")
    })
    it("User professor filter, search by last name", ()=>{
        cy.get(Locators.Header.Professors).eq(3).click()
        cy.get(Locators.Header.All_professors).eq(0).click()
        cy.get(Locators.Professor.professor_title).should("have.text", "All Professors Page")
        cy.get(Locators.Professor.professor_search).type(prof_last_name)
        cy.get("tbody").should("not.be.visible")
    })
    it("Use professor filter, search by gradebook name", ()=>{
        cy.get(Locators.Header.Professors).eq(3).click()
        cy.get(Locators.Header.All_professors).eq(0).click()
        cy.get(Locators.Professor.professor_title).should("have.text", "All Professors Page")
        cy.get(Locators.Professor.professor_search).type(gradebook)
        cy.get("tbody").should("not.be.visible")
    })
    afterEach("Clear cache", ()=>{
        cy.clearLocalStorage()
    })







})