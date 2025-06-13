const prisma = require('../prisma/prisma')

module.exports = {
  async find(where) {
    // [GET] http://localhost:5432/api/pets?type=dog
    // SELECT * FROM "Pet" WHERE type='dog';
    const pets = await prisma.pet.findMany({ where })
    return pets
  },

  async findById(id) {
    // SELECT * FROM "Pet" WHERE id = 1
    // [GET] http://localhost:5432/api/pets/1
    const pets = await prisma.pet.findMany({ where })
    return pets
  },

  async create({ name, type, age }) {
    // INSERT INTO "Pet" (name, type, age) VALUES (...)

  },

  async update(id, changes) {
    // UPDATE "Pet" SET ... WHERE id = 1

  },

  async delete(id) {
    // DELETE FROM "Pet" WHERE id = 1

  },
}
