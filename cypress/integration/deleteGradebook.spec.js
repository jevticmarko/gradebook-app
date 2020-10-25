const Locators = require("../fixtures/Locators.json")
import faker from "faker"
describe ("Delete gradebook", ()=>{

    const email = faker.internet.email()
    const firstname = faker.name.firstName()
    const lastname = faker.name.lastName()
    let password = "123456789"
    let title = "random title"
    let profname = firstname+" "+lastname

    beforeEach ("Register and create gradebook", ()=>{
        cy.Register(firstname, lastname, password, email)
        cy.wait(1000)
        cy.get(Locators.Header.myGradebook).eq(2).click()
        cy.Create_gradebook(title, profname)
        cy.wait(500)
    })
    it("Delete gradebook", ()=>{
        cy.get(Locators.Header.myGradebook).eq(1).click()
        cy.get(Locators.MyGradebook.delete_gradebook).eq(1).click()
        cy.wait(500)
        cy.get(Locators.Header.myGradebook).eq(1).click()
        cy.wait(500)
        cy.get("tbody").should("not.be.visible")
    })





})