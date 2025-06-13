const prisma = require('../prisma/prisma')

module.exports = {
  async find(where) {
    // [GET] http://localhost:5432/api/pets?type=dog
    // SELECT * FROM "Pet" WHERE type='dog';
    const pets = await prisma.Pet.findMany({ where })
    return pets
  },

  async findById(id) {
    // [GET] http://localhost:5432/api/pets/1
    // SELECT * FROM "Pet" WHERE id = 1
    const pets = await prisma.Pet.findMany({ where })
    return pets
  },

  async create({ name, type, age }) {
    // [POST] http://localhost:5432/api/pets/1 { name: "Fido", type: "dog": age: 5 }
    // INSERT INTO "Pet" (name, type, age) VALUES (...)
    const created = await prisma.Pet.create({ data: { name, type, age } })
    return created
  },

  async update(id, changes) {
    // UPDATE "Pet" SET ... WHERE id = 1

  },

  async delete(id) {
    // DELETE FROM "Pet" WHERE id = 1

  },
}
