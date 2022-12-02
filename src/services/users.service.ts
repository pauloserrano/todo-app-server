import bcrypt from "bcrypt"
import { conflictError, notFoundError } from "@errors"
import { User } from "@prisma/client"
import { usersRepository } from "@repositories"
import { UserCreate, UserUpdate } from "@types"

const getUsers = async () => {
  const users = await usersRepository.findUsers()
  return users
}

const getUserById = async (userId: User["id"]) => {
  const user = await usersRepository.findUserById(userId)
  if (!user){
    throw notFoundError("Could not locate user")
  }

  return user
}

const postUser = async (data: UserCreate) => {
  const user = await usersRepository.findUserByEmail(data.email)
  if (user){
    throw conflictError("Email is already in use")
  }

  const hashedPassword = await hashPassword(data.password)

  return usersRepository.createUser({
    ...data,
    password: hashedPassword
  })
}

const updateUser = async (userId: User["id"], data: UserUpdate) => {
  //const user = await getUserById(userId)

  return usersRepository.updateUser(userId, data)
}

const deleteUser = async (userId: User["id"]) => {
  return usersRepository.deleteUser(userId)
}

const hashPassword = async (password: User["password"]) => {
  const salt = await bcrypt.genSalt()
  return bcrypt.hash(password, salt)
}
/*
const comparePassword = async (password: User["password"]) => {
  return bcrypt.compare(password, process.env.JWT_SECRET)
}
*/
const usersService = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser
}

export default usersService
