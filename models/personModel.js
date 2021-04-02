const mongoose = require('mongoose')

const practiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        default: new Date().toLocaleString()
    }
})

module.exports = mongoose.model('practice', practiceSchema)