const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const userRouter = require('./routes/userRoute')
const cors = require('cors')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("Database connected"))

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)

app.listen(4000, () => console.log("Server is running!"))