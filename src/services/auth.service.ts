import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { unauthorizedError } from "@errors"
import { sessionRepository, usersRepository } from "@repositories"
import { UserLogin } from "@types"

const signIn = async (data: UserLogin) => {
  const user = await usersRepository.findUserByEmail(data.email)
  if (!user){
    throw unauthorizedError()
  }

  const isPasswordValid = bcrypt.compare(data.password, user.password)
  if (!isPasswordValid){
    throw unauthorizedError()
  }

  const payload = { userId: user.id }
  if (!process.env.JWT_SECRET){
    throw unauthorizedError()
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET)
  await sessionRepository.createSession({ token, userId: user.id })

  return token
}

const authService = {
  signIn
}

export default authService
