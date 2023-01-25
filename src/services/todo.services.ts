import { Todo } from "@prisma/client"
import { badRequestError } from "@errors"
import { todoRepository, userRepository } from "@repositories"
import { TodoCreate, TodoUpdate } from "@types"
import { exclude } from "@src/helpers"

const getTodosByUserId = async (userId: Todo["userId"]) => {
  return todoRepository.findTodosByUserId(userId)
}

const getTodoById = async (id: Todo["id"], userId: Todo["userId"]) => {
  return todoRepository.findTodoById(id, userId)
}

const createTodo = async (userId: Todo["userId"], data: TodoCreate) => {
  const user = await userRepository.findUserById(userId)
  if (!user) {
    return badRequestError()
  }

  const todo = await todoRepository.createTodo({ userId, ...data })

  return exclude(todo, ["userId"])
}

const updateTodo = async (id: Todo["id"], data: TodoUpdate) => {
  const todo = await todoRepository.updateTodo(id, data)

  return exclude(todo, ["userId"])
}

const deleteTodo = async (id: Todo["id"]) => {
  return todoRepository.deleteTodo(id)
}

const todoService = {
  getTodosByUserId,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
}

export default todoService
