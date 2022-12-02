import { prisma } from "@config"
import { Session } from "@prisma/client"
import { SessionCreate } from "@types"

const createSession = async (data: SessionCreate) => {
  return prisma.session.create({ data })
}

const findSessionByUserId = (userId: Session["userId"]) => {
  return prisma.session.findFirst({
    where: { userId }
  })
}

const findSessionByToken = (token: Session["token"]) => {
  return prisma.session.findUnique({
    where: { token }
  })
}

const deleteSessionById = async (id: Session["id"]) => {
  return prisma.session.delete({
    where: { id }
  })
}

const sessionRepository = {
  createSession,
  findSessionByUserId,
  findSessionByToken,
  deleteSessionById
}

export { sessionRepository }
