const Locators = require("../fixtures/Locators.json")
describe ("Add comment functionality", ()=>{

    let email = "kalabaster@live.com"
    let password = "123456789"
    let comment = "random comment"
    let title = "random created"
    let prof_name = "marko jevtic"
    let longComment = "2Yk2YGeYuMGqZr0vshutS3iqUdOA4dKlfj01bGfBBcZZxOu89h7P9uNXaBWQmYDh1WBRHF4pgXdtbsxh78qZX12kamsMlwybgMk3EsqF1BD6cYchqA5IcjLMqzSdTNakRkKGIxa1wChlqYS1HehQ4TwD3mAJ8wRxdQK4szXz5KMF69iJafTmEgGIO3A0Hrfzdze1lXcNeTLAccZM3tNuamu8JguBkgDfipxQRht9rpkUKhOuzVP5NX6b1M7ppsmz"

    beforeEach("Login and create gradebook", ()=>{
        cy.Login(email, password)
        cy.get(Locators.Header.createGradebook).eq(2).click()
        cy.url().should("contain", "/create-gradebook")
        cy.Create_gradebook(title, prof_name)
    })
    it("Add comment to my gradebook", ()=>{
        cy.get(Locators.Comment.textarea).type(comment)
        cy.get(Locators.Comment.submit_comment).eq(3).click()
        cy.get(Locators.Header.Gradebooks).eq(0).click()
        cy.wait(500)
        cy.get(Locators.Header.myGradebook).eq(1).click()
        cy.wait(500)
        cy.get(Locators.Comment.added_comment).should("be.visible")
        cy.get(Locators.Comment.added_comment).should("contain", comment)
        cy.Delete_gradebook()
    })
    it("Delete comment from my gradebook", ()=>{           
        cy.Add_comment(comment)
        cy.get(Locators.Comment.delete_comment_button).eq(3).click()
        cy.get(Locators.Comment.added_comment).should("not.be.visible")
        cy.Delete_gradebook()
    })
    it("Add comment without gradebook created", ()=>{
        cy.Delete_gradebook()
        cy.get(Locators.Comment.textarea).type(comment)
        cy.get(Locators.Comment.submit_comment).eq(1).click()
        cy.get(Locators.Comment.alertMessage).should("contain", "Message: You dont have your diary. Please first set your own diary")
    })
    it("Add comment 256 characters long", ()=>{
        cy.server()
        cy.route("POST", "https://gradebook-api.vivifyideas.com/api/diaries/265/comments", 500).as("post") //nisam uspeo da promenim gradebookID, osim da menjam stalno manuelno  
        cy.get(Locators.Comment.textarea).type(longComment)
        cy.get(Locators.Comment.submit_comment).eq(3).click()      
        cy.get('@post').should('have.property', 'status', 200)
    })
    it("Add multiple comments", ()=>{
        cy.Add_comment(comment)
        cy.Add_comment(comment)
        cy.Add_comment(comment)
        cy.wait(300)
        cy.Delete_gradebook()
    })






})