const { json } = require('express')
const express = require('express')
require('dotenv').config()
const colors = require('colors')
const port = process.env.PORT || 5000
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const gameRoutes = require('./routes/games')

const app = express()

app.use(cors())

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/games', gameRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

connectDB()