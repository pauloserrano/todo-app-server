import { Router } from "express"
import { getTodos, getTodoById, postTodo, updateTodo, deleteTodo } from "@src/controllers/todo.controller"
import { authenticateToken, validateBody, validateParams, } from "@middlewares"
import { genericIdSchema, newTodoSchema, updateTodoSchema } from "@schemas"

const todoRouter = Router()

todoRouter
  .all("/*", authenticateToken)
  .get("/", getTodos)
  .get("/:id", validateParams(genericIdSchema), getTodoById)
  .post("/", validateBody(newTodoSchema), postTodo)
  .patch("/:id", validateParams(genericIdSchema), validateBody(updateTodoSchema), updateTodo)
  .delete("/:id", validateParams(genericIdSchema), deleteTodo)

export { todoRouter }
