const express = require('express')
const router = express.Router()
const Person = require('../models/personModel')

//Getting all
router.get('/', async (req, res) => {
    try {
        const persons = await Person.find()
        res.json(persons)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Getting one
router.get('/:id', getPerson, (req, res) => {
     res.json(res.person)
})

//Creating one
router.post('/', async (req, res) => {
    const person = new Person({
        name: req.body.name,
    })
    try {
        const newPerson = await person.save()
        res.status(201).json(newPerson)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Updating one
router.patch('/:id', getPerson, async (req, res) => {
    if (req.body.name != null) {
        res.person.name = req.body.name
    }
    try {
        const updatedPerson = await res.person.save()
        res.json(updatedPerson)
    } catch (error) {
        res.status(400).json({ message: err.message })
    }
})

//Deleting one
router.delete('/:id', getPerson, async (req, res) => {
    try {
        await res.person.remove()
        res.json({ message: 'Deleted Person' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getPerson (req, res, next) {
    let person
    try {
        person = await Person.findById(req.params.id)
        if (person == null){
            return res.status(404).json({ message: 'Cannot find person' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }   

    res.person = person
    next()
} 

module.exports = router