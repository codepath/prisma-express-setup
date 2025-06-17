// import prisma client lib and instantiate

module.exports = {
  async find(where) {
    // GET http://localhost:5432/api/pets?type=dog
    // SELECT * FROM "Pet" WHERE type='dog';

  },

  async findById(id) {
    // GET http://localhost:5432/api/pets/1
    // SELECT * FROM "Pet" WHERE id = 1;

  },

  async create(changes) {
    // POST http://localhost:5432/api/pets/1 { name: "Fido", type: "dog": age: 5 }
    // INSERT INTO "Pet" (name, type, age) VALUES ('Fido', 'dog', 5);

  },

  async update(id, changes) {
    // PUT http://localhost:5432/api/pets/1 { adopted: true }
    // UPDATE "Pet" SET adopted = true WHERE id = 1;

  },

  async delete(id) {
    // DELETE http://localhost:5432/api/pets/1
    // DELETE FROM "Pet" WHERE id = 1;

  },
}
