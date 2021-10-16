const chai = require("chai")
const chaiHttp = require("chai-http")
const userModel = require("../models/userModel")
const mongoose = require("mongoose")
const dotenv = require('dotenv')

chai.use(chaiHttp)
dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS)

// Create test data, set up variables for testing

const dummy = {
    _id: "61696d98a325a5037c2dd637",
    email: "admin@tester.com",
    password: "test123",
    givenname: "Dummy"
}
const newName = "Dorothy"
const adminAccount = {
    email: "davidehuang@qq.com",
    password: "davidehuang"
}
const serverhost = "http://localhost:4000/user" || "https://it-project-team045.herokuapp.com"

// Connect to mongoDB database

describe("Test setup", () => {

    describe("Connect to database", () => {
        before((done) => {
            mongoose.connect(process.env.DATABASE_ACCESS)
            .then(() =>{
                done()
            }).catch((error) => {
                done(error)
            })
        })

        it("Connected to MongoDB", () => {
            chai.expect(mongoose.connection.readyState).to.equal(1)
        })
    })

    describe("Login with admin account", () => {
        before((done) => {
            chai
            .request(serverhost)
            .post("/adminLogin")
            .type('form')
            .send(adminAccount)
            .end((error, response) => {
                if (error) done(error)
                this.sessionToken = response.body.token
                done()
            })
        })

        it("Logged in with admin account", () => {
            chai.expect(this.sessionToken).to.exist
        })
    })

    describe("Create mock user", () => {
        before((done) => {
            chai
            .request(serverhost)
            .post("/userSignup")
            .type('form')
            .set("Authorization", "Bearer " + this.sessionToken)
            .send(dummy)
            .end((error, response) => {
                if (error) done(error)
                this.dummy = response
            })
            done()
        })

        it("Created mock user", async () => {
            var users = await userModel.find({email: dummy.email}).exec()
            chai.expect(users.length).to.equal(1)
        })
    })
})

// Tests for admin functionalities
describe("Admin tests", () => {

    describe("Edit user route", () => {
        before((done) => {
            // Attempt to edit a user
            chai
            .request(serverhost)
            .post("/editUser/" + dummy._id)
            .type('form')
            .set("Authorization", "Bearer " + this.sessionToken)
            .send({
                givenname: newName
            })
            .end((error, response) => {
                if (error) done(error)
                this.response = response
                console.log(this.response)
                done()
            })
        })
        
        it("Returns HTML code 200 on success", async () => {
            var users = await userModel.find({email: dummy.email}).exec()
            console.log(users)
            chai.expect(this.response.statusCode).to.equal(200)
        })
        it("Changes user information from one state to another", async () => {
            var user = await userModel.findOne({email: dummy.email}).exec()
            chai.expect(user.givenname = newName).to.equal(0)
        })
    })

    describe("Delete route", () => {

        // Attempt to delete mock user
        before((done) => {
            chai
            .request(serverhost)
            .delete("/delete/" + dummy._id)
            .set("Authorization", "Bearer " + this.sessionToken)
            .send(dummy)
            .end((error, response) => {
                if (error) done(error)
                this.response = response
                done()
            })
        })

        it("Returns HTML code 200 on success", async () => {      
            chai.expect(this.response.statusCode).to.equal(200)
        })

        it("Deletes user from database", async () => {
            var users = await userModel.find({email: dummy.email}).exec()
            chai.expect(users.length).to.equal(0)
        })

        it("Redirects admin back to admin home page after successful deletion", async () => {
            chai.expect(this.response.body.redirect).equal("/adminHome")
        })
    })    
})


// Close mongoDB connection
after((done) => {
    mongoose.connection.close()
    done()
})