const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const flash = require('connect-flash-plus')
const signUpRoutesUrls = require('./routes/userRoute')


const cors = require('cors');
const passport = require('passport');
const session = require('express-session');



//MongoDB database configure
dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("Database connected"))


app.use(express.json())
app.use(cors())
app.use(flash())

// setup session store signing the contents using the secret key
app.use(session({secret:process.env.PASSPORT.KEY,
    resave: true,
saveUninitialized: true
}));

// access body of a POST request (body parser)
app.use(express.urlencoded({extended: true}));

// Passport middleware
app.use(passport.initialize());       // initialize usage of passport
app.use(passport.session());          // invoked when using login session

//Configure routers with corresponding root path
app.use('/user', signUpRoutesUrls)



app.listen(4000, () => console.log("Server is running!"))