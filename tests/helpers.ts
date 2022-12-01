import { prisma } from "@config"

export async function wipeDb(){
  prisma.session.deleteMany({})
  prisma.todo.deleteMany({})
  prisma.user.deleteMany({})
}
