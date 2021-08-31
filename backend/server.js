const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

//Set up mongodb
dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("Database connected"))

app.use(express.json())
app.use(cors())

//Get all routers
const userRouter = require('./routes/userRoute')

//Direct router to certain root path
app.use('/user', userRouter)

app.listen(4000, () => console.log("Server is running!"))