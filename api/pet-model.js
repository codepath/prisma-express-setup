let id = 0

function getId() {
  return ++id
}

let pets = [
  { id: getId(), name: 'Luna', type: 'Dog', age: 3, adopted: false },
  { id: getId(), name: 'Milo', type: 'Cat', age: 2, adopted: true },
]

module.exports = {
  async findAll() {
    // SELECT * FROM "Pet"
    return pets
  },

  async findById(id) {
    // SELECT * FROM "Pet" WHERE id = 1
    return pets.find(p => p.id == id)
  },

  async create({ name, type, age }) {
    // INSERT INTO "Pet" (name, type, age) VALUES (...)
    const newPet = { id: getId(), name, type, age }
    pets.push(newPet)
    return newPet
  },

  async update(id, changes) {
    // UPDATE "Pet" SET ... WHERE id = 1
    const pet = pets.find(p => p.id == id)
    if (!pet) return null

    const updatedPet = { ...pet, ...changes, id }
    pets = pets.map(p => (p.id == id ? updatedPet : p))
    return updatedPet
  },

  async delete(id) {
    // DELETE FROM "Pet" WHERE id = 1
    const pet = pets.find(p => p.id == id)
    if (!pet) return null

    pets = pets.filter(p => p.id != id)
    return pet
  },
}
