import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function createUser() {
  return prisma.user.create({
      data: {
        email: 'alice@prisma.io',
        name: 'Alice',
        password: "132",
        Todo: {
          create: { content: 'Workout' }
        },
      },
  })
}

createUser()
  .then(async () => await prisma.$disconnect())
  .catch(async () => await prisma.$disconnect())
