import { prisma } from "@config"

const findUsers = () => {
  return prisma.user.findMany()
}

const usersRepository = {
  findUsers
}

export { usersRepository } 
