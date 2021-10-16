const chai = require("chai")
const chaiHttp = require("chai-http")

chai.use(chaiHttp);

// Create test data, set up variables for testing
const adminEmail = "davidehuang@qq.com"
const adminPassword = "davidehuang"
const badEmail = "incorrect@test.com"
const badPassword = "incorrect123"

const serverhost = "http://localhost:4000/user" || "https://it-project-team045.herokuapp.com"

// Tests for login route
describe("Admin Login route", () => {

    // Successful login test block
    describe("On successful login attempt", ()=> {

        // Attempt login as a valid admin
        before((done) => {
            chai
            .request(serverhost)
            .post("/adminLogin")
            .type('form')
            .send({
                email: adminEmail,
                password: adminPassword,
            })
            .end((error, response) => {
                if (error) done(error)
                this.response = response
                done()
            })
        })

        it("Returns HTML code 200", () =>  {      
            chai.expect(this.response.statusCode).to.equal(200)
        })
        it("Successfully creates a session key", () =>  {     
            chai.expect(this.response.body.token).to.exist    
        })
        it("Redirects admin to the admin home page", () =>  {         
            chai.expect(this.response.body.redirect).equal("/adminHome")
        })
    })

    describe("On failed login attempt", ()=> {
        describe("For an incorrect password", ()=> {

            // Attempt login with incorrect password
            before((done) => {
                chai
                .request(serverhost)
                .post("/adminLogin")
                .type('form')
                .send({
                    email: adminEmail,
                    password: badPassword,
                })
                .end((error, response) => {
                    if (error) done(error)
                    this.response = response
                    done()
                })
            })

            it("Returns HTML code 200", () =>  {
                chai.expect(this.response.statusCode).to.equal(200)
            })
            it("Rejects the login attempt by redirecting back to the admin login page", () =>  {
                chai.expect(this.response.body.redirect).equal("/adminLogin")
            })
        })

        describe("For an invalid email (username)", ()=> {

            // Attempt login with an invalid email
            before((done) => {
                chai
                .request(serverhost)
                .post("/adminLogin")
                .type('form')
                .send({
                    email: badEmail,
                    password: badPassword,
                })
                .end((error, response) => {
                    if (error) done(error)
                    this.response = response
                    done()
                })
            })

            it("Returns HTML code 200", () =>  {
                chai.expect(this.response.statusCode).to.equal(200)
            })
            it("Rejects the login attempt by redirecting back to the admin login page", () =>  {
                chai.expect(this.response.body.redirect).equal("/adminLogin")
            })
        })
    })
})