const chai = require("chai")
const chaiHttp = require("chai-http")
const userModel = require("../models/userModel")
const mongoose = require("mongoose")
const dotenv = require('dotenv')

chai.use(chaiHttp)
dotenv.config()

// Create test data, set up variables for testing

const dummyEmail = "register@tester.com"
const dummyPassword = "test123"
const existingEmail = "alice@test.com"
const badEmail = "bad_email.com"
const badPassword = "123"
const adminAccount = {
    email: "davidehuang@qq.com",
    password: "davidehuang"
}
const serverhost = "http://localhost:4000/user" || "https://it-project-team045.herokuapp.com"

// Connect to mongoDB database
before((done) => {
    mongoose.connect(process.env.DATABASE_ACCESS).then(() =>{
        console.log("Mongoose connection state: " + mongoose.connection.readyState);
        done()
    }).catch((error) => {
        done(error)
    })
})

// Close mongoDB connection
after((done) => {
    mongoose.connection.close()
    done()
})

// Tests for sign-up
describe("Register route", () => {

    // Login with administrator account
    before((done) => {
        chai
        .request(serverhost)
        .post("/adminLogin")
        .type('form')
        .send(adminAccount)
        .end((error, response) => {
            if (error) done(error)
            this.sessionToken = response.body.SavedToken
            done()
        })
    })

    describe("On successful registration", () => {
        
        // Create a mock user
        before((done) => {
            chai
            .request(serverhost)
            .post("/userSignup")
            .type('form')
            .set("Authorization", "Bearer " + this.sessionToken)
            .send({
                email: dummyEmail,
                password: dummyPassword
            })
            .end((error, response) => {
                if (error) done(error), this.successful = false
                this.response = response
                this.successful = true
                done()
            })
        })

        // Delete mock user
        after((done) => {
            if (this.successful) {
                userModel.deleteOne({ email: dummyEmail }, (err) => {
                    if (err) return done(err)
                })
            }
            done()
        })

        it("Returns HTML code 200", async () =>  {
            chai.expect(this.response.statusCode).to.equal(200)
        })
        it("Creates one user account in the database", async () =>  {
            users = await userModel.find({email: dummyEmail}).exec()
            chai.expect(users.length).to.equal(1)
        })
        it("Password is hashed in database", async () =>  {
            user = await userModel.findOne({email: dummyEmail}).exec()
            chai.expect(user.password).to.not.equal(dummyPassword)
        })
    })

    describe("On failure for registration", () => {

        describe("For a registration with an existing email", () => {

            // Attempt to create a user with existing email
            before((done) => {
                chai
                .request(serverhost)
                .post("/userSignup")
                .type('form')
                .set("Authorization", "Bearer " + this.sessionToken)
                .send({
                    email: existingEmail,
                    password: dummyPassword
                })
                .end((error, response) => {
                    if (error) done(error)
                    this.response = response
                    done()
                })
            })

            it("Returns HTML code 200", async () =>  {
                chai.expect(this.response.statusCode).to.equal(200)
            })
            it("Rejects the registration attempt, not creating a new user", async () =>  {
                users = await userModel.find({email: existingEmail}).exec()
                chai.expect(users.length).to.equal(1)
            })
        })

        describe("For an email with an incorrect format", () => {

            // Attempt to create a user with an incorrect email format
            before((done) => {
                chai
                .request(serverhost)
                .post("/userSignup")
                .type('form')
                .set("Authorization", "Bearer " + this.sessionToken)
                .send({
                    email: badEmail,
                    password: dummyPassword
                })
                .end((error, response) => {
                    if (error) done(error)
                    this.response = response
                    done()
                })
            })

            it("Returns HTML code 200", async () =>  {
                chai.expect(this.response.statusCode).to.equal(200)
            })
            it("Rejects the registration attempt, not creating a new user", async () =>  {
                users = await userModel.find({email: badEmail}).exec()
                chai.expect(users.length).to.equal(0)
            })
        })

        describe("For a registration with password length lesser than 6", () => {

            // Attempt to create a user with existing email
            before((done) => {
                chai
                .request(serverhost)
                .post("/userSignup")
                .type('form')
                .set("Authorization", "Bearer " + this.sessionToken)
                .send({
                    email: dummyEmail,
                    password: badPassword
                })
                .end((error, response) => {
                    if (error) done(error)
                    this.response = response
                    done()
                })
            })

            it("Returns HTML code 200", async () =>  {
                chai.expect(this.response.statusCode).to.equal(200)
            })
            it("Rejects the registration attempt, not creating a new user", async () =>  {
                users = await userModel.find({email: dummyEmail}).exec()
                chai.expect(users.length).to.equal(0)
            })
        })
    })
})