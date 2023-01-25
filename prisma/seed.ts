import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function createUser() {
  return prisma.user.create({
    data: {
      email: 'john@prisma.io',
      name: 'John Doe',
      password: "132",
      Todo: {
        create: { content: 'Lorem Ipsum' }
      },
    },
  })
}

createUser()
  .then(async () => await prisma.$disconnect())
  .catch(async () => await prisma.$disconnect())
