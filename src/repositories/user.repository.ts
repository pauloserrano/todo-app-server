import { prisma } from "@config"
import { User } from "@prisma/client"
import { UserCreate } from "@types"

const findUsers = () => {
  return prisma.user.findMany()
}

const findUserById = (id: User["id"]) => {
  return prisma.user.findUnique({
    where: { id }
  })
}

const findUserByEmail = (email: User["email"]) => {
  return prisma.user.findUnique({
    where: { email }
  })
}

const createUser = (data: UserCreate) => {
  return prisma.user.create({ data })
}

const updateUser = (id: string, data: Partial<UserCreate>) => {
  return prisma.user.update({
    where: { id },
    data: {
      ...data
    }
  })
}

const deleteUser = (id: User["id"]) => {
  return prisma.user.delete({
    where: { id }
  })
}

const userRepository = {
  findUsers,
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser
}

export { userRepository } 
