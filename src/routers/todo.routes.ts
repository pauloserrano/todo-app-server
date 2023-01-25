import { Router } from "express"
import { getTodos, postTodo } from "@src/controllers/todo.controller"
import { authenticateToken, validateBody, } from "@middlewares"
import { newTodoSchema } from "@schemas"

const todoRouter = Router()

todoRouter
  .all("/*", authenticateToken)
  .get("/", getTodos)
  .post("/", validateBody(newTodoSchema), postTodo)
  .patch("/",)
  .delete("/",)

export { todoRouter }
