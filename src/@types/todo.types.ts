import { Todo } from "@prisma/client"

export type TodoCreate = {
  name: Todo["name"],
  description?: Todo["description"]
}

export type TodoUpdate = Partial<Pick<Todo, "name" | "description" | "isFinished">>
