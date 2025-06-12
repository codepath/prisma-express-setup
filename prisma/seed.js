const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const pets = [
    { name: 'Luna', type: 'Dog', age: 3, adopted: false },
    { name: 'Milo', type: 'Cat', age: 2, adopted: true },
    { name: 'Bubbles', type: 'Fish', age: 1, adopted: false },
    { name: 'Coco', type: 'Parrot', age: 5, adopted: true },
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
