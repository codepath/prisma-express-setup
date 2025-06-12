const express = require('express')
const cors = require('cors')
const Pet = require('./pet-model')

const server = express()
server.use(express.json())
server.use(cors())

// [GET] /
server.get('/', (req, res) => {
  res.json({ hello: 'world' })
})

// [GET] /api/pets
server.get('/api/pets', async (req, res, next) => {
  try {
    const pets = await Pet.findAll()
    res.json(pets)
  } catch (err) {
    next(err)
  }
})

// [GET] /api/pets/:id
server.get('/api/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)
    pet
      ? res.json(pet)
      : res.status(404).json({ message: `no pet with id ${req.params.id}` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// [POST] /api/pets
server.post('/api/pets', async (req, res) => {
  const { name, weight } = req.body
  if (!name || !weight) {
    return res.status(400).json({ message: 'name and weight are required' })
  }
  try {
    const newPet = await Pet.create(req.body)
    res.status(201).json(newPet)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// [PUT] /api/pets/:id
server.put('/api/pets/:id', async (req, res) => {
  const { name, type, age } = req.body
  if (!name || !type || age === undefined) {
    return res.status(400).json({ message: 'name, type and age are required' })
  }
  try {
    const updated = await Pet.update(req.params.id, req.body)
    updated
      ? res.json(updated)
      : res.status(404).json({ message: `pet not found with id ${req.params.id}` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// [DELETE] /api/pets/:id
server.delete('/api/pets/:id', async (req, res) => {
  try {
    const deleted = await Pet.delete(req.params.id)
    deleted
      ? res.json(deleted)
      : res.status(404).json({ message: `pet not found with id ${req.params.id}` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = server
