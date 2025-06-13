const prisma = require('../prisma/prisma')

module.exports = {
  async find(where) {
    // SELECT * FROM "Pet"
    const pets = await prisma.pet.findMany({ where })
    return pets
  },

  async findById(id) {
    // SELECT * FROM "Pet" WHERE id = 1

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
