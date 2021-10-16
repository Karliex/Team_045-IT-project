const chai = require("chai")
const chaiHttp = require("chai-http")
const userModel = require("../models/userModel")
const mongoose = require("mongoose")
const dotenv = require('dotenv')

chai.use(chaiHttp)
dotenv.config()

// Create test data, set up variables for testing

const query = "alice"
const noMatch = "ZzZzZzZzZz"
const dummyEmail = "alice@test.com"
const adminAccount = {
    email: "davidehuang@qq.com",
    password: "davidehuang"
}
const serverhost = "http://localhost:4000/user" || "https://it-project-team045.herokuapp.com"

// Connect to mongoDB database
before((done) => {
    mongoose.createConnection(process.env.DATABASE_ACCESS).then(() =>{
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

// Tests for search
describe("Search route", () => {

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

    describe("On successful search", () => {
        
        // Make search request
        before((done) => {
            chai
            .request(serverhost)
            .post("/search")
            .type('form')
            .set("Authorization", "Bearer " + this.sessionToken)
            .send({query: query})
            .end((error, response) => {
                if (error) done(error)
                this.response = response
                done()
            })
        })

        it("Returns HTML code 200", async () =>  {
            chai.expect(this.response.statusCode).to.equal(200)
        })
        it("Searched for the correct target \"alice\"", async () =>  {
            user = await userModel.findOne({email: dummyEmail}).exec()
        })
    })

    describe("On search for non-exist entry", () => {

        // Make search request
        before((done) => {
            chai
            .request(serverhost)
            .post("/search")
            .type('form')
            .set("Authorization", "Bearer " + this.sessionToken)
            .send({query: noMatch})
            .end((error, response) => {
                if (error) done(error)
                this.response = response
                done()
            })
        })

        it("Returns HTML code 200", async () =>  {
            chai.expect(this.response.statusCode).to.equal(200)
        })
        it("Returns empty results", async () =>  {
            chai.expect(this.response.body.length).to.equal(0)
        })

    })
})
