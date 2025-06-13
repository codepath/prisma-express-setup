const prisma = require('../prisma/prisma')

module.exports = {
  async find(where) {
    // GET http://localhost:5432/api/pets?type=dog
    // SELECT * FROM "Pet" WHERE type='dog';
    const pets = await prisma.Pet.findMany({ where })
    return pets
  },

  async findById(id) {
    // GET http://localhost:5432/api/pets/1
    // SELECT * FROM "Pet" WHERE id = 1;
    const pet = await prisma.Pet.findUnique({ where: { id } })
    return pet
  },

  async create(changes) {
    // POST http://localhost:5432/api/pets/1 { name: "Fido", type: "dog": age: 5 }
    // INSERT INTO "Pet" (name, type, age) VALUES ('Fido', 'dog', 5);
    const created = await prisma.Pet.create({ data: changes })
    return created
  },

  async update(id, changes) {
    // PUT http://localhost:5432/api/pets/1 { adopted: true }
    // UPDATE "Pet" SET adopted = true WHERE id = 1;
    const updated = await prisma.Pet.update({
      where: { id },
      data: changes,
    })
    return updated
  },

  async delete(id) {
    // DELETE http://localhost:5432/api/pets/1
    // DELETE FROM "Pet" WHERE id = 1;
    const deleted = await prisma.Pet.delete({
      where: { id },
    })
    return deleted
  },
}
