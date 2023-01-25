import Joi from "joi"
import { TodoCreate, TodoUpdate } from "@src/@types/todo.types"

export const newTodoSchema = Joi.object<TodoCreate>({
  name: Joi.string().required(),
  description: Joi.string()
})

export const updateTodoSchema = Joi.object<Partial<TodoUpdate>>({
  name: Joi.string(),
  description: Joi.string(),
  isFinished: Joi.boolean()
})
