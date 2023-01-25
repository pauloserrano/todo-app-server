import { Todo } from "@prisma/client"
import { badRequestError } from "@errors"
import { todoRepository, userRepository } from "@repositories"
import { TodoCreate } from "@types"
import { exclude } from "@src/helpers"

const getTodosByUserId = async (userId: Todo["userId"]) => {
  return todoRepository.findTodosByUserId(userId)
}

const createTodo = async (userId: Todo["userId"], data: TodoCreate) => {
  const user = await userRepository.findUserById(userId)
  if (!user) {
    return badRequestError()
  }

  const todo = await todoRepository.createTodo({ userId, ...data })

  return exclude(todo, ["userId"])
}

const todoService = {
  getTodosByUserId,
  createTodo
}

export default todoService
