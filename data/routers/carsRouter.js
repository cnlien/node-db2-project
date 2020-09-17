const express = require('express');
const knex = require('../dbConfig.js');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const cars = await knex('cars');
        res.json(cars)
    }
    catch{
        res.status(500).json({ message: 'There was an error on the server' })
    }
})

router.post('/', validateCar, async (req, res) => {
    const newCar = req.body;
    try {
        const cars = await knex.insert(newCar).into('cars')
        res.status(201).json(cars)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "There was an error on the server", error: err })
    }
})

router.put('/:id', validateCar, async (req, res) => {
    const { id } = req.params;
    const changes = req.body
    try {
        const count = await knex('cars').update(changes).where({id})
        count
            ? res.json({ updated: count, id:id, changes: changes })
            : res.status(404).json({ message: `The car with id: ${id} does not exist`})
    }
    catch (err) {
        res.status(500).json({ message: "There was an error on the server" })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const count = await knex('cars').where({id}).del();
        count
            ? res.status(202).json({ deleted: count, id: id})
            : res.status(404).json({ message: "That vehicle does not exisit"})
    }
    catch (err) {
        res.status(500).json({ message: "There was an error on teh server" })
    }
})

function validateCar (req,res,next) {
    data = req.body
    !data
        ? res.status(400).json({ message: "Missing required data" })
        : next();
}

module.exports = router;