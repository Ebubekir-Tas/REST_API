require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
/*
    env is simply 'DATABASE_URL=mongodb://localhost/person', for practice purposes.
*/
const db = mongoose.connection
db.on('error', (error)=>{console.error(error)})
db.once('open', ()=>{console.log('Connected to database')})

app.use(express.json())

const personRouter = require('./routes/person')
app.use('/person', personRouter)

app.listen(3000, () => console.log('Server Started'))