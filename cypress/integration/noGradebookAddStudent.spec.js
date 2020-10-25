const Locators = require("../fixtures/Locators.json")

describe ("Adding student", ()=>{

    let email = "kalabaster@live.com"
    let password = "123456789"

    it.only("Add student with no gradebook created", ()=>{
        cy.Login(email,password)
        cy.get(Locators.Header.myGradebook).eq(1).click()
        cy.wait(500)
        cy.get(Locators.MyGradebook.add_student).eq(0).click()
        cy.get(Locators.MyGradebook.alert).should("contain", "Message: You dont have your diary. Please first set your own diary")
    })





})