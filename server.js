const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');
const port = process.env.PORT || 4000
const app = express();
const server = require('http').createServer(app);

const dotenv = require('dotenv')

// parses data received from POST and makes available the request body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// MongoDB database configure
dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("Database connected"))


// modules for authentication
const passport = require('passport');

const session = require('express-session');
const flash = require('connect-flash');
const jwt = require('jsonwebtoken');

// passport config
require('./config/passport')(passport);

// setup session store signing the contents using the secret key
app.use(
    session({
    secret: process.env.PASSPORT_KEY,
    resave: true,
    saveUninitialized: true
}));


app.use(express.static('/client'));

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

// Use the routers with path
const userRoute = require('./routes/userRoute')
app.use('/user', userRoute);

// for heroku deployment
if (process.env.NODE_ENV === 'production') {

	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

server.listen(port, () =>
	console.log('Server listening for requests ...'))

module.exports = app;