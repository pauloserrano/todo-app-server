import { Todo } from "@prisma/client"
import { TodoCreate } from "@src/@types"
import { prisma } from "@src/config"

const findTodosByUserId = (userId: Todo["userId"]) => {
  return prisma.todo.findMany({
    where: { userId }
  })
}

const createTodo = (data: TodoCreate & { userId: Todo["userId"] }) => {
  return prisma.todo.create({ data })
}

const deleteAllTodosByUserId = (userId: Todo["userId"]) => {
  return prisma.todo.deleteMany({
    where: { userId }
  })
}

const todoRepository = {
  findTodosByUserId,
  createTodo,
  deleteAllTodosByUserId
}

export { todoRepository }
