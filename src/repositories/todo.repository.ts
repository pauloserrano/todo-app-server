import { Todo } from "@prisma/client"
import { TodoCreate, TodoUpdate } from "@src/@types"
import { prisma } from "@src/config"

const findTodosByUserId = (userId: Todo["userId"]) => {
  return prisma.todo.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      description: true,
      isFinished: true,
      createdAt: true,
      lastEditedAt: true
    }
  })
}

const findTodoById = (id: Todo["id"], userId: Todo["userId"]) => {
  return prisma.todo.findFirst({
    where: { id, userId },
    select: {
      id: true,
      name: true,
      description: true,
      isFinished: true,
      createdAt: true,
      lastEditedAt: true
    }
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
  findTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodosByUserId
}

export { todoRepository }
