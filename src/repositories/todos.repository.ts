import { Todo } from "@prisma/client"
import { prisma } from "@src/config"

const deleteAllTodosByUserId = (userId: Todo["userId"]) => {
  return prisma.todo.deleteMany({
    where: { userId }
  })
}

const todoRepository = {
  deleteAllTodosByUserId
}

export { todoRepository }
