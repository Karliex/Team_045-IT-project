const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

app.use(express.json())
app.use(cors())

//mongoDB related
dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("Database connected"))

// all routers
const user = require('./routes/userRoute')

// connect route path with routers
app.use('/user', user)


app.listen(4000, () => console.log("Server is running!"))