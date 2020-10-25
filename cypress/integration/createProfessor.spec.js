const Locators = require("../fixtures/Locators.json")

describe ("Create professor", ()=>{

    let email = "kalabaster@live.com"
    let password = "123456789"
    let professorName = "zivojin"
    let professorLastName = "misic"
    let imgurl = "https://images-na.ssl-images-amazon.com/images/I/61xsFKE4QEL._AC_SL1000_.jpg"
    let imgurl2 = "https://i.pinimg.com/474x/1a/31/59/1a3159e4c899e2fd71b5fe58d0c2b5a9.jpg"

    beforeEach("Login and visit create professor page", ()=>{
        cy.Login(email, password)
        cy.get(Locators.Header.Professors).eq(3).click()
        cy.get(Locators.Header.Create_professor).eq(1).click()
        cy.url().should("contain", "/create-professor")
    })
    it("Create professor", ()=>{
        cy.get(Locators.Professor.professor_name).type(professorName)
        cy.get(Locators.Professor.professor_last_name).type(professorLastName)
        cy.get(Locators.Professor.add_image).eq(0).click()
        cy.get(Locators.Professor.professor_img_url).type(imgurl)
        cy.get(Locators.Professor.submit_professor).eq(4).click()
        cy.get(Locators.Professor.professor_title).should("have.text", "All Professors Page")
        cy.get(Locators.Professor.professor_search).type(professorName)
        cy.get(Locators.Professor.professor_list).should("contain", professorName)
    })
    it("Create professor without first name", ()=>{
        cy.get(Locators.Professor.professor_last_name).type(professorLastName)
        cy.get(Locators.Professor.add_image).eq(0).click()
        cy.get(Locators.Professor.professor_img_url).type(imgurl)
        cy.get(Locators.Professor.submit_professor).eq(4).click()
        cy.get(Locators.Professor.professor_name).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Create professor without last name", ()=>{
        cy.get(Locators.Professor.professor_name).type(professorName)
        cy.get(Locators.Professor.add_image).eq(0).click()
        cy.get(Locators.Professor.professor_img_url).type(imgurl)
        cy.get(Locators.Professor.submit_professor).eq(4).click()
        cy.get(Locators.Professor.professor_last_name).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Create professor without image", ()=>{
        cy.get(Locators.Professor.professor_name).type(professorName)
        cy.get(Locators.Professor.professor_last_name).type(professorLastName)
        cy.get(Locators.Professor.submit_professor).eq(1).click()
        cy.wait(400)
        cy.get(Locators.Professor.alert).should("contain", "The url field is required.")
    })
    it("Multiple images, test move up and down buttons", ()=>{
        cy.get(Locators.Professor.professor_name).type(professorName)
        cy.get(Locators.Professor.professor_last_name).type(professorLastName)
        cy.get(Locators.Professor.add_image).eq(0).dblclick()
        cy.get(Locators.Professor.professor_img_url).eq(0).type(imgurl)
        cy.get(Locators.Professor.professor_img_url).eq(1).type(imgurl2)
        cy.get(Locators.Professor.move_img_down).eq(3).click()
        cy.get("input[name=image_NaN]").eq(1).should("have.value", imgurl)
        cy.get(Locators.Professor.move_img_up).eq(5).click()
        cy.get("input[name=image_NaN]").eq(0).should("have.value", imgurl)
        cy.get(Locators.Professor.submit_professor).eq(7).click()
        cy.get(Locators.Professor.professor_title).should("have.text", "All Professors Page")
        cy.get(Locators.Professor.professor_search).type(professorName)
        cy.get(Locators.Professor.professor_list).should("contain", professorName)
    })
    afterEach("Clear cache", ()=>{
        cy.clearLocalStorage()
    })





})