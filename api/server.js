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
    const pet = await Pet.findById(id)
    if (pet) {
      res.json(pet)
    } else {
      next({ status: 404, message: `No pet found with ID ${id}` })
    }
  } catch (err) {
    next(err)
  }
})

// [GET] /api/pets
server.get('/api/pets', async (req, res, next) => {
  const search = req.query
  try {
    // The details about how the pets are pulled from the DB are abstracted away
    const pets = await Pet.find(search)
    if (pets.length) {
      res.json(pets)
    } else {
      next({ status: 404, message: 'No pets found match the search criteria' })
    }
  } catch (err) {
    next(err)
  }
})

// [POST] /api/pets
server.post('/api/pets', async (req, res, next) => {
  const newPet = req.body
  try {
    // Validate that newPet has all the required fields
    const newPetValid = (
      newPet.name !== undefined &&
      newPet.type !== undefined &&
      newPet.age !== undefined
    )
    if (newPetValid) {
      const created = await Pet.create(newPet)
      res.status(201).json(created)
    } else {
      next({ status: 422, message: 'name, type and age are required' })
    }
  } catch (err) {
    next(err)
  }
})

// [PUT] /api/pets/:id
server.put('/api/pets/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  const changes = req.body
  try {
    // Make sure the ID is valid
    const pet = await Pet.findById(id)
    // Validate that the changes include at least one valid change
    const changesValid = (
      changes.name !== undefined ||
      changes.type !== undefined ||
      changes.age !== undefined ||
      changes.adopted !== undefined
    )
    if (pet && changesValid) {
      const updated = await Pet.update(id, changes)
      res.json(updated)
    } else {
      next({ status: 422, message: 'Invalid ID or invalid changes' })
    }
  } catch (err) {
    next(err)
  }
})

// [DELETE] /api/pets/:id
server.delete('/api/pets/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const pet = await Pet.findById(id)
    if (pet) {
      const deleted = await Pet.delete(id)
      res.json(deleted)
    } else {
      next({ status: 404, message: 'Pet not found' })
    }
  } catch (err) {
    next(err)
  }
})

// [CATCH-ALL]
server.use('/*', (req, res, next) => {
  next({ status: 404 })
})

// Error handling middleware
server.use((err, req, res, next) => {
  const { message, status = 500 } = err
  console.log(message)
  res.status(status).json({ message }) // Unsafe in prod
})

module.exports = server
