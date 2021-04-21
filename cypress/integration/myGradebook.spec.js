const Locators = require("../fixtures/Locators.json")

describe ("My gradebook testing", ()=>{

    let email = "kalabaster@live.com"
    let password = "123456789"
    let edited_title = "edited title"
    let studentName = "saban"
    let studentLastName = "saulic"
    let studentImage = "https://i.pinimg.com/originals/46/4d/d1/464dd1317678a1698ba036fdf3755892.jpg"
    let studentImage2 = "https://images-na.ssl-images-amazon.com/images/I/61JkUyW8lwL._AC_SL1000_.jpg"
    let email2 = "yojevticyo@yahoo.com"
    let professor_name = "gandra tito"
    let title = "random title"
    let prof = "marko jevtic"

    beforeEach("Visit app and login", ()=>{
        cy.Login(email,password)
        cy.get(Locators.Header.createGradebook).eq(2).click()
        cy.Create_gradebook(title, prof)
        cy.wait(500)
    })
    it("Inspect my gradebook page", ()=>{
        cy.get(Locators.MyGradebook.myGradebookTitle).should("have.text", "My Gradebook Page")
    })
    it("Add students", ()=>{
        cy.get(Locators.MyGradebook.add_student).eq(0).click()
        cy.get(Locators.MyGradebook.student_name).type(studentName)
        cy.get(Locators.MyGradebook.student_last_name).type(studentLastName)
        cy.get(Locators.MyGradebook.student_img_button).eq(0).click()
        cy.get(Locators.MyGradebook.student_url).eq(2).type(studentImage)
        cy.get(Locators.MyGradebook.submit_student).eq(4).click()
        cy.get(Locators.MyGradebook.table).should("contain", "saban saulic")
    })
    it("Add student with multiple images and test moving url links", ()=>{
        cy.get(Locators.MyGradebook.add_student).eq(0).click()
        cy.get(Locators.MyGradebook.student_name).type(studentName)
        cy.get(Locators.MyGradebook.student_last_name).type(studentLastName)
        cy.get(Locators.MyGradebook.student_img_button).eq(0).click()
        cy.get(Locators.MyGradebook.student_url).eq(2).type(studentImage)
        cy.get(Locators.MyGradebook.student_img_button).eq(0).click()
        cy.get(Locators.MyGradebook.student_url).eq(3).type(studentImage2)
        cy.get(Locators.MyGradebook.move_down_button).eq(3).click()
        cy.get(Locators.MyGradebook.remove_url_button).eq(4).click()
        cy.get(Locators.MyGradebook.submit_student).eq(4).click()
        cy.wait(500)
    })
    it("Edit gradebook title", ()=>{
        cy.get(Locators.MyGradebook.edit_gradebook).eq(2).click()
        cy.get(Locators.CreateGradebook.gradebook_title).clear()
        cy.wait(700)
        cy.get(Locators.CreateGradebook.gradebook_title).type(edited_title)
        cy.get(Locators.CreateGradebook.submit_gradebook).click()
        cy.wait(500)
        cy.get(Locators.Header.myGradebook).eq(1).click()
        cy.wait(500)
        cy.get(Locators.MyGradebook.table).should("contain", edited_title)
    })
    it("Edit gradebook professor", ()=>{
        cy.get(Locators.MyGradebook.edit_gradebook).eq(2).click()
        cy.get(Locators.MyGradebook.select_professor).select(professor_name)
        cy.get(Locators.MyGradebook.edit_gradebook).click()
        cy.get(Locators.Login.Logout).eq(2).click()
        cy.url().should("contain","/login")
        cy.get(Locators.Login.Email).eq(0).type(email2)
        cy.get(Locators.Login.Password).eq(1).type(password)
        cy.get(Locators.Login.Submit).click()
        cy.wait(500)
        cy.get(Locators.Header.myGradebook).eq(1).click()
        cy.wait(500)
        cy.get(Locators.MyGradebook.table).should("contain", title)
    })

    afterEach("Clear cache", ()=>{
        cy.Delete_gradebook()
        cy.clearLocalStorage()
    })




})