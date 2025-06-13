const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const pets = [
    { name: 'Luna', type: 'dog', age: 3, adopted: false },
    { name: 'Milo', type: 'cat', age: 2, adopted: false },
    { name: 'Bubbles', type: 'fish', age: 1, adopted: false },
    { name: 'Coco', type: 'parrot', age: 5, adopted: false },
    { name: 'Bicho', type: 'dog', age: 15, adopted: true },
  ]

  for (const pet of pets) {
    await prisma.pet.create({ data: pet })
  }

  console.log('Seeded pets!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
