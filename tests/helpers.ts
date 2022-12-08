import { prisma } from "@config"

export async function wipeDb() {
  await prisma.session.deleteMany({})
  await prisma.todo.deleteMany({})
  await prisma.user.deleteMany({})
}
