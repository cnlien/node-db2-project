const express = require('express')
const db = require('../data/dbConfig.js');
const carsRouter = require('../data/routers/carsRouter.js');
const server = express();

server.use(express.json());
server.use('/api/cars', carsRouter)

server.get('/', (req, res) => {
    res.status(200).json({message: 'API is running'})
})

module.exports = server;