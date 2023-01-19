import jwt from "jsonwebtoken"
import { User } from "@prisma/client"
import { prisma } from "@src/config"
import { userFactory } from "./user.factory"

export async function createSession(params?: User) {
  const { id: userId } = params || (await userFactory.createUser())
  const token = jwt.sign({ userId }, process.env.JWT_SECRET)
  await prisma.session.create({ data: { token, userId } })

  return token
}

const authFactory = {
  createSession
}

export { authFactory }
