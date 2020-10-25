const Locators = require("../fixtures/Locators.json")

describe ("Testing login functionality", ()=>{

    let email = "kalabaster@live.com"
    let password = "123456789"
    let wrongEmail = "marko@gmail.com"
    let wrongPassword = "marko1"

    beforeEach("Visit app", ()=>{
        cy.visit("https://gradebook.vivifyideas.com/")
        cy.url().should("contain", "https://gradebook.vivifyideas.com/")
    })
    it("Successful login", ()=>{
        cy.get(Locators.Login.Email).eq(0).type(email)
        cy.get(Locators.Login.Password).eq(1).type(password)
        cy.get(Locators.Login.Submit).click()
        cy.wait(500)
        cy.url().should("contain", "/gradebooks")
        cy.get("h3").should("have.text", " All Gradebooks Page")
    })
    it("Successful logout", ()=>{
        cy.get(Locators.Login.Email).eq(0).type(email)
        cy.get(Locators.Login.Password).eq(1).type(password)
        cy.get(Locators.Login.Submit).click()
        cy.url().should("contain", "/gradebooks")
        cy.get(Locators.Login.Logout).eq(2).click()
        cy.url().should("contain", "/login")
        cy.get(Locators.Login.Login_title).should("have.text", "Please login")
    })
    it("Login with empty fields", ()=>{
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Email).eq(0).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Login without email", ()=>{
        cy.get(Locators.Login.Password).eq(1).type(password)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Email).eq(0).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Login without password", ()=>{
        cy.get(Locators.Login.Email).eq(0).type(email)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Password).eq(1).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Login with invalid credentials", ()=>{
        cy.server()
        cy.route("POST", "https://gradebook-api.vivifyideas.com/api/login", 401).as("login")
        cy.get(Locators.Login.Email).eq(0).type(wrongEmail)
        cy.get(Locators.Login.Password).eq(1).type(wrongPassword)
        cy.get(Locators.Login.Submit).click()
        cy.get('@login').should('have.property', 'status', 200)
    })
    afterEach("Clear cache", ()=>{
        cy.clearLocalStorage()
    })



})