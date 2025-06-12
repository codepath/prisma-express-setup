import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const pets = [
    { name: 'Luna', species: 'Dog', breed: 'Labrador Retriever', age: 3, adopted: false },
    { name: 'Milo', species: 'Cat', breed: 'Siamese', age: 2, adopted: true },
    { name: 'Bubbles', species: 'Fish', breed: 'Goldfish', age: 1, adopted: false },
    { name: 'Coco', species: 'Parrot', breed: 'African Grey', age: 5, adopted: true },
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
