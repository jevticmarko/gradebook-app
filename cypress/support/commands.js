const Locators = require("../fixtures/Locators.json")

Cypress.Commands.add("Login", (email, password)=>{
    cy.visit("https://gradebook.vivifyideas.com/")
    cy.get(Locators.Login.Email).eq(0).type(email)
    cy.get(Locators.Login.Password).eq(1).type(password)
    cy.get(Locators.Login.Submit).click()
    cy.url().should("contain", "/gradebooks")
    cy.get("h3").should("have.text", " All Gradebooks Page")
})

Cypress.Commands.add("Add_student", (name, lastName, img)=>{
    cy.get(Locators.MyGradebook.add_student).eq(0).click()
    cy.get(Locators.MyGradebook.student_name).type(name)
    cy.get(Locators.MyGradebook.student_last_name).type(lastName)
    cy.get(Locators.MyGradebook.student_img_button).eq(0).click()
    cy.get(Locators.MyGradebook.student_url).eq(2).type(img)
    cy.get(Locators.MyGradebook.submit_student).eq(4).click()
})

Cypress.Commands.add("Add_comment", (comment)=>{
    cy.get(Locators.Comment.textarea).type(comment)
    cy.get(Locators.Comment.submit_comment).contains("Submit Comment").click()
    cy.get(Locators.Header.Gradebooks).eq(0).click()
    cy.wait(500)
    cy.get(Locators.Header.myGradebook).eq(1).click()
    cy.wait(500)
    cy.get(Locators.Comment.added_comment).should("be.visible")
    cy.get(Locators.Comment.added_comment).should("contain", comment)
})

Cypress.Commands.add("Create_gradebook", (title, prof_name)=>{
    cy.get(Locators.CreateGradebook.gradebook_title).type(title)
    cy.get(Locators.CreateGradebook.professor_select).select(prof_name)
    //cy.get(Locators.CreateGradebook.professor_select).should("have.value", 65)
    cy.get(Locators.CreateGradebook.submit_gradebook).click()
    cy.url().should("contain", "/gradebooks")
    cy.get(Locators.Header.myGradebook).eq(1).click()
    cy.get(Locators.MyGradebook.table).should("contain", prof_name)
})

Cypress.Commands.add("Delete_gradebook", ()=>{
    cy.get(Locators.MyGradebook.delete_gradebook).eq(1).click()
    cy.wait(500)
    cy.get(Locators.Header.myGradebook).eq(1).click()
    cy.wait(500)
    cy.get("tbody").should("not.be.visible")
})

Cypress.Commands.add("Register", (firstname, lastname, password, email)=>{
    cy.visit("https://gradebook.vivifyideas.com/")
    cy.get(Locators.Header.Register).eq(1).click()
    cy.url().should("contain", "/register")
    cy.get(Locators.Register.first_name).type(firstname)
    cy.get(Locators.Register.last_name).type(lastname)
    cy.get(Locators.Register.password).type(password)
    cy.get(Locators.Register.password_confirmation).type(password)
    cy.get(Locators.Register.email).type(email)
    cy.get(Locators.Register.login_button).click()
    cy.url().should("contain", "/gradebooks")
})