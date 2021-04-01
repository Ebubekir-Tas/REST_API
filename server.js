require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/person', { useNewUrlParser: true, useUnifiedTopology: true })
/*
    for encryped env, replace 'mongodb://localhost/person' with: process.env.DATABASE_URL
*/
const db = mongoose.connection
db.on('error', (error)=>{console.error(error)})
db.once('open', ()=>{console.log('Connected to database')})

app.use(express.json())

const personRouter = require('./routes/person')
app.use('/person', personRouter)

app.listen(3000, () => console.log('Server Started'))