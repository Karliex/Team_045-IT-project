const express = require('express')
const app = express()
const mongoose = require('mongoose')
//store some info in the environment variables
const dotenv = require('dotenv')

const userRoute = require('./routes/userRoute')
const cors = require('cors');

//modules for authentication
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const jwt = require('jsonwebtoken');

//MongoDB database configure
dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("Database connected"))

// Passport Config
require('./config/passport')(passport);

app.use(cors())

// setup session store signing the contents using the secret key
app.use(
    session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());       // initialize usage of passport
app.use(passport.session());          // invoked when using login session
app.use(flash());                    // Connect flash

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// important to receive data sent to API using POST, parses and makes available the 
// request body
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // replaces body-parser

//Configure routers with corresponding root path
app.use('/', userRoute)
app.all('*', (req, res) => {  // 'default' route to catch user errors
	//res.status(404).render('error', {errorCode: '404', message: 'That route is invalid.'})
	res.send('error')
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("Server is running!"))