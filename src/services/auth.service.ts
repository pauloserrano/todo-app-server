import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { unauthorizedError } from "@errors"
import { sessionRepository, usersRepository } from "@repositories"
import { UserLogin } from "@types"
import { exclude } from "@src/helpers"

const signIn = async (data: UserLogin) => {
  const user = await usersRepository.findUserByEmail(data.email)
  if (!user) {
    throw unauthorizedError()
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password)
  if (!isPasswordValid) {
    throw unauthorizedError()
  }

  // TODO Review this rule later
  const hasSession = await sessionRepository.findSessionByUserId(user.id)
  if (hasSession) {
    await sessionRepository.deleteSessionById(hasSession.id)
  }

  const payload = { userId: user.id }
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  await sessionRepository.createSession({ token, userId: user.id })

  return { user: exclude(user, ["id", "password"]), token }
}

const authService = {
  signIn
}

export default authService
