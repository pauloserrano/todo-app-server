import { prisma } from "@config"
import { SessionCreate } from "@types"

const createSession = (data: SessionCreate) => {
  return prisma.session.create({ data })
}

const sessionRepository = {
  createSession
}

export { sessionRepository }
