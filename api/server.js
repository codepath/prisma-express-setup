const express = require('express')
const cors = require('cors')
const Pet = require('./pet-model-prisma')

const server = express()
server.use(express.json())
server.use(cors())

// [GET] /api/pets/:id
server.get('/api/pets/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
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
  const { type } = req.query
  try {
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
server.post('/api/pets', async (req, res, next) => {
  const newPet = req.body
  try {
    // Validate that newPet has all required fields. Then:
    const created = await Pet.create(newPet)
    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
})

// [PUT] /api/pets/:id
server.put('/api/pets/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  const changes = req.body
  try {
    // if the id is invalid, or if the changes are invalid, this will error:
    const updated = await Pet.update(Number(id), changes)
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

// [DELETE] /api/pets/:id
server.delete('/api/pets/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const deleted = await Pet.delete(id)
    res.json(deleted)
  } catch (err) {
    next(err)
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
