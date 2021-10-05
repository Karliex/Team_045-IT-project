// Food Buddy server, with prototype HTML in the route handlers
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');
const port = process.env.PORT || 4000
const app = express();
const server = require('http').createServer(app);

const dotenv = require('dotenv')

const io = require('socket.io')(server);

// important to receive data sent to API using POST, parses and makes available the 
// request body
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // replaces body-parser

app.use(cors())

const proxy = require('http-proxy-middleware')


io.of('/apt/socket').on("connection",(socket) =>{
	console.log("socket.io: User connected: ",socket.id);
	socket.on("disconnect",() =>{
		console.log("socket.io: User disconnected: ",socket.id);
	})
});

//MongoDB database configure
dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("Database connected"))


//modules for authentication
const passport = require('passport');

const session = require('express-session');
const flash = require('connect-flash');
const jwt = require('jsonwebtoken');

// Passport Config
require('./config/passport')(passport);


module.exports = function(app) {
    // add other server routes to path array
    app.use(proxy(['/api' ], { target: 'http://localhost:5000' }));
}


// setup session store signing the contents using the secret key
app.use(
    session({
    secret: process.env.PASSPORT_KEY,
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

const userRoute = require('./routes/userRoute')

// Use the routers with path
app.use('/user', userRoute);



if (process.env.NODE_ENV === 'production') {

	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

server.listen(port, () =>
	console.log('Server listening for requests ...'))

module.exports = app;
