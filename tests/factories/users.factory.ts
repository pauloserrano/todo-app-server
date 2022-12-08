import bcrypt from "bcrypt"
import { faker } from "@faker-js/faker"
import { User } from "@prisma/client"
import { prisma } from "@config"

async function createUser(params?: Omit<User, "id">): Promise<User> {
  const { name, email, password } = params || (getMockUser())
  const hash = await bcrypt.hash(password, 10)

  const { id } = await prisma.user.create({
    data: { name, email, password: hash }
  })

  return { id, name, email, password }
}

function deleteUser(id: User["id"]){
  return prisma.user.delete({ where: { id } })
}

function getMockUser(): Omit<User, "id"> {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

const usersFactory = {
  createUser,
  getMockUser,
  deleteUser
}

export { usersFactory }
