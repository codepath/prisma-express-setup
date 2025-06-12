// IMPORTS AT THE TOP
// IMPORTS AT THE TOP
// IMPORTS AT THE TOP
const express = require('express')
const Pet = require('./pet-model')

// INSTANCE OF EXPRESS APP
// INSTANCE OF EXPRESS APP
// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
// GLOBAL MIDDLEWARE
// GLOBAL MIDDLEWARE
server.use(express.json()) // teaches express how to parse JSON from the request body

// ENDPOINTS
// ENDPOINTS
// ENDPOINTS

// [GET] / (Hello World endpoint)
server.get('/', (req, res) => {
  // name is not important (could be request, response), position is.
  res.json({ hello: 'world' })
})

// [GET] /api/pets (Read of CRUD, fetch all pets)
server.get('/api/pets', (req, res) => {
  // 1- gather info from the request object
  // 2- interact with db
  Pet.findAll()
    .then(pets => {
      // 3A- send appropriate response
      res.status(200).json(pets)
    })
    .catch(error => {
      // 3B- send appropriate response (sad path)
      res.status(500).json({ error: error.message })
    })
})

// [GET] /api/pets/:id (Read of CRUD, fetch pet by :id)
server.get('/api/pets/:id', (req, res) => {
  // 1- gather info from the request object
  const { id } = req.params
  // 2- interact with db
  Pet.findById(id)
    .then(pet => {
      // 3A- send appropriate response
      pet
        ? res.status(200).json(pet)
        : res.status(404).json({ message: `no pet with id ${id}` })
    })
    .catch(error => {
      // 3B- send appropriate response (something crashed)
      res.status(500).json({ error: error.message })
    })
})

// [POST] /api/pets (C of CRUD, create new pet from JSON payload)
server.post('/api/pets', async (req, res) => {
  // EXPRESS, BY DEFAULT IS NOT PARSING THE BODY OF THE REQUEST
  // 1- gather info from the request object
  const pet = req.body

  // crude validation of req.body
  if (!pet.name || !pet.weight) {
    res.status(400).json({ message: 'name and weight are required' })
  } else {
    try {
      // 2- interact with db
      const newlyCreatedDog = await Pet.create(pet)
      // 3- send appropriate response
      res.status(201).json(newlyCreatedDog)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
})

// [PUT] /api/pets/:id (U of CRUD, update pet with :id using JSON payload)
server.put('/api/pets/:id', async (req, res) => {
  // 1- pull info from req
  const changes = req.body
  const { id } = req.params

  // crude validation of req.body
  if (!changes.name || !changes.type || changes.age === undefined) {
    res.status(400).json({ message: 'name, weight and adopter_id are required' })
  } else {
    try {
      // 2- interact with db through helper
      const updatedDog = await Pet.update(id, changes)
      // 3- send appropriate response
      if (updatedDog) {
        res.status(200).json(updatedDog)
      } else {
        res.status(404).json({ message: 'pet not found with id ' + id })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
})

// [DELETE] /api/pets/:id (D of CRUD, remove pet with :id)
server.delete('/api/pets/:id', (req, res) => {
  // 1- gather info from the request object
  const { id } = req.params
  // 2- interact with db
  Pet.delete(id)
    .then(deleted => {
      // 3- send appropriate response
      if (deleted) {
        res.status(200).json(deleted)
      } else {
        res.status(404).json({ message: 'pet not found with id ' + id })
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
})

// EXPOSING THE SERVER TO OTHER MODULES
// EXPOSING THE SERVER TO OTHER MODULES
// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server
