import { usersRepository } from "@repositories"

const getUsers = () => {
  return usersRepository.findUsers()
}

const usersService = {
  getUsers
}

export default usersService
