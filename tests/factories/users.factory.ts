import bcrypt from "bcrypt"
import { User } from "@prisma/client"
import { prisma } from "@config"

async function createUser(params?: Partial<User>): Promise<User> {
  const incomingPassword = params?.password || "123"
  const hashedPassword = await bcrypt.hash(incomingPassword, 10)

  return prisma.user.create({
    data: {
      name: params?.name || "John Doe",
      email: params?.email || "test@test.com",
      password: hashedPassword
    },
  })
}

async function cleanDb(): Promise<void> {
  await prisma.user.deleteMany({})
}

const usersFactory = {
  createUser,
  cleanDb
}

export default usersFactory
