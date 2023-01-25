import { Todo } from "@prisma/client"
import { TodoCreate, TodoUpdate } from "@src/@types"
import { prisma } from "@src/config"

const findTodosByUserId = (userId: Todo["userId"]) => {
  return prisma.todo.findMany({
    where: { userId }
  })
}

const createTodo = (data: TodoCreate & { userId: Todo["userId"] }) => {
  return prisma.todo.create({ data })
}

const updateTodo = (id: Todo["id"], data: TodoUpdate) => {
  return prisma.todo.update({
    where: { id },
    data
  })
}

const deleteTodo = (id: Todo["id"]) => {
  return prisma.todo.delete({
    where: { id }
  })
}

const deleteAllTodosByUserId = (userId: Todo["userId"]) => {
  return prisma.todo.deleteMany({
    where: { userId }
  })
}

const todoRepository = {
  findTodosByUserId,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodosByUserId
}

export { todoRepository }
