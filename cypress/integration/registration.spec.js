const Locators = require("../fixtures/Locators.json")
import faker from "faker"

describe ("Registration testing", ()=>{
    
    const email = faker.internet.email()
    let lastName = faker.name.lastName()
    let firstName = faker.name.firstName()
    let password = "123456789"
    let passwordConfirmation = "123456789"
    let wrongPasswordConfirmation = "marko123"
    let wrongEmail = "markojevtc.gmail.com"
    let wrongPasswordType = "12"
    
    
    beforeEach("Visit register page", ()=>{
        cy.visit("https://gradebook.vivifyideas.com/")
        cy.get(Locators.Header.Register).eq(1).click()
        cy.url().should("contain", "/register")
    })
    it.only("Register user without first name", ()=>{
        cy.get(Locators.Register.last_name).type(lastName)
        cy.get(Locators.Register.password).type(password)
        cy.get(Locators.Register.password_confirmation).type(passwordConfirmation)
        cy.get(Locators.Register.email).type(email)
        //cy.get(Locators.Register.terms).click()
        cy.get(Locators.Register.login_button).click()
        cy.get(Locators.Register.first_name).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it.only("Register user without last name", ()=>{
        cy.get(Locators.Register.first_name).type(firstName)
        cy.get(Locators.Register.password).type(password)
        cy.get(Locators.Register.password_confirmation).type(passwordConfirmation)
        cy.get(Locators.Register.email).type(email)
        //cy.get(Locators.Register.terms).click()
        cy.get(Locators.Register.login_button).click()
        cy.get(Locators.Register.last_name).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Register user without email", ()=>{
        cy.get(Locators.Register.first_name).type(firstName)
        cy.get(Locators.Register.last_name).type(lastName)
        cy.get(Locators.Register.password).type(password)
        cy.get(Locators.Register.password_confirmation).type(passwordConfirmation)
        cy.get(Locators.Register.login_button).click()
        cy.get(Locators.Register.email).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it('Password confirmation does not match', () => {
        const stub = cy.stub()
        cy.on('window:alert', stub)
        cy.get(Locators.Register.first_name).type(firstName)
        cy.get(Locators.Register.last_name).type(lastName)
        cy.get(Locators.Register.password).type(password)
        cy.get(Locators.Register.password_confirmation).type(wrongPasswordConfirmation)
        cy.get(Locators.Register.email).type(email)
        //cy.get(Locators.Register.terms).click()
        cy.get('button').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Your passwords doesn`t match, try again, please')           
          })
      })
      it("Register user with email not containing @", ()=>{
          cy.get(Locators.Register.first_name).type(firstName)
          cy.get(Locators.Register.last_name).type(lastName)
          cy.get(Locators.Register.password).type(password)
          cy.get(Locators.Register.password_confirmation).type(passwordConfirmation)
          cy.get(Locators.Register.email).type(wrongEmail)
          //cy.get(Locators.Register.terms).click()
          cy.get(Locators.Register.login_button).click()
          cy.get(Locators.Register.email).then(($input)=>{
              expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. "+"'"+ wrongEmail +"'" + " is missing an '@'.")
          })
      })
      it("Register user with wrong password format", ()=>{
          cy.get(Locators.Register.first_name).type(firstName)
          cy.get(Locators.Register.last_name).type(lastName)
          cy.get(Locators.Register.password).type(wrongPasswordType)
          cy.get(Locators.Register.password_confirmation).type(passwordConfirmation)
          cy.get(Locators.Register.email).type(email)
          //cy.get(Locators.Register.terms).click()
          cy.get(Locators.Register.login_button).click()
          cy.get(Locators.Register.password).then(($input)=>{
              expect($input[0].validationMessage).to.eq("Please match the requested format.")
          })
      })
      it("Register user with valid credentials", ()=>{
          cy.get(Locators.Register.first_name).type(firstName)
          cy.get(Locators.Register.last_name).type(lastName)
          cy.get(Locators.Register.password).type(password)
          cy.get(Locators.Register.password_confirmation).type(passwordConfirmation)
          cy.get(Locators.Register.email).type(email)
          //cy.get(Locators.Register.terms).click()
          cy.get(Locators.Register.login_button).click()
          cy.url().should("contain", "/gradebooks")
      })


    








})