import bcrypt from "bcrypt"
import { User, Session } from "@prisma/client"
import { conflictError, notFoundError } from "@errors"
import { sessionRepository, todoRepository, userRepository } from "@repositories"
import { UserCreate, UserUpdate } from "@types"
import { exclude } from "@src/helpers"

const getUsers = async () => {
  const users = await userRepository.findUsers()
  return users.map(user => exclude(user, ["password"]))
}

const getUserById = async (userId: User["id"]) => {
  const user = await userRepository.findUserById(userId)
  if (!user) {
    throw notFoundError("Could not locate user")
  }

  return exclude(user, ["password"])
}

const postUser = async (data: UserCreate) => {
  const user = await userRepository.findUserByEmail(data.email)
  if (user) {
    throw conflictError("Email is already in use")
  }

  const hashedPassword = await hashPassword(data.password)
  await userRepository.createUser({
    ...data,
    password: hashedPassword
  })

  return { name: data.name, email: data.email }
}

const updateUser = async (userId: User["id"], data: UserUpdate) => {
  const user = await getUserById(userId)
  if (!user) {
    throw notFoundError("User not found")
  }

  if (data.password) {
    data.password = await hashPassword(data.password)
  }

  return userRepository.updateUser(userId, data)
}

const deleteUser = async (userId: User["id"], token: Session["token"]) => {
  await sessionRepository.deleteSessionByToken(token)
  await todoRepository.deleteAllTodosByUserId(userId)
  await userRepository.deleteUser(userId)
}

const hashPassword = async (password: User["password"]) => {
  const salt = await bcrypt.genSalt()
  return bcrypt.hash(password, salt)
}

const userService = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser
}

export default userService
