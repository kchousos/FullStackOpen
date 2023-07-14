const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
