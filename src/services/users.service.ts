import bcrypt from "bcrypt"
import { conflictError, notFoundError } from "@errors"
import { User, Session } from "@prisma/client"
import { sessionRepository, todoRepository, usersRepository } from "@repositories"
import { UserCreate, UserUpdate } from "@types"
import { exclude } from "@src/helpers"

const getUsers = async () => {
  const users = await usersRepository.findUsers()
  return users.map(user => exclude(user, ["password"]))
}

const getUserById = async (userId: User["id"]) => {
  const user = await usersRepository.findUserById(userId)
  if (!user) {
    throw notFoundError("Could not locate user")
  }

  return exclude(user, ["password"])
}

const postUser = async (data: UserCreate) => {
  const user = await usersRepository.findUserByEmail(data.email)
  if (user) {
    throw conflictError("Email is already in use")
  }

  const hashedPassword = await hashPassword(data.password)
  await usersRepository.createUser({
    ...data,
    password: hashedPassword
  })

  return { name: data.name, email: data.email }
}

const updateUser = async (userId: User["id"], data: UserUpdate) => {
  const user = await getUserById(userId)
  if (!user){
    throw notFoundError("User not found")
  }

  if (data.password){
    data.password = await hashPassword(data.password)
  }

  return usersRepository.updateUser(userId, data)
}

const deleteUser = async (userId: User["id"], token: Session["token"]) => {
  await sessionRepository.deleteSessionByToken(token)
  await todoRepository.deleteAllTodosByUserId(userId)
  await usersRepository.deleteUser(userId)
}

const hashPassword = async (password: User["password"]) => {
  const salt = await bcrypt.genSalt()
  return bcrypt.hash(password, salt)
}

const usersService = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser
}

export default usersService
