import bcrypt from "bcrypt"
import { User } from "@prisma/client"
import { conflictError, notFoundError } from "@errors"
import { sessionRepository, todoRepository, userRepository } from "@repositories"
import { UserCreate, UserUpdate } from "@types"
import { exclude } from "@src/helpers"

const getUsers = async () => {
  const users = await userRepository.findUsers()
  return users.map(user => exclude(user, ["password"]))
}

const getUserById = async (id: User["id"]) => {
  const user = await userRepository.findUserById(id)
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

const deleteUser = async (id: User["id"]) => {
  await sessionRepository.deleteSessionByUserId(id)
  await todoRepository.deleteAllTodosByUserId(id)
  await userRepository.deleteUser(id)
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
