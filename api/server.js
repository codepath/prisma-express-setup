const express = require('express')
const cors = require('cors')
const Pet = require('./pet-model-prisma')

const server = express()
server.use(express.json())
server.use(cors())

// [GET] /api/pets/:id
server.get('/api/pets/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const pet = await Pet.find({ id: Number(id) })
    if (!pet.length) {
      next({ status: 404, message: `No pet found with ID ${id}` })
    } else {
      res.json(pet)
    }
  } catch (err) {
    next(err)
  }
})

// [GET] /api/pets
server.get('/api/pets', async (req, res, next) => {
  try {
    const { type } = req.query
    // The details about how the pets are pulled from the DB are abstracted away
    const pets = await Pet.find({ type })
    if (pets.length) {
      res.json(pets)
    } else {
      next({ status: 404, message: 'No pets found matching search criteria' })
    }
  } catch (err) {
    next(err)
  }
})

// [POST] /api/pets
server.post('/api/pets', async (req, res) => {
  try {
    const newPet = await Pet.create(req.body)
    res.status(201).json(newPet)
  } catch (err) {
    next(err)
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

// [CATCH-ALL]
server.use('*', (req, res, next) => {
  next({ status: 404 })
})

// Error handling middleware
server.use((err, req, res, next) => {
  const { message, status = 500 } = err
  console.log(message)
  res.status(status).json({ message }) // Unsafe in prod
})

module.exports = server
