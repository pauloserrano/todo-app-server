import { Router } from "express"
import { getUsers, getUserById, postUser, updateUser, deleteUser } from "@controllers/users.controller"
import { authenticateToken, validateBody, validateParams } from "@middlewares"
import { updateUserSchema, userIdSchema, newUserSchema } from "@schemas"

const usersRouter = Router()

usersRouter
  .get("/", getUsers)
  .get("/:userId", validateParams(userIdSchema), getUserById)
  .post("/", validateBody(newUserSchema), postUser)
  .patch("/", authenticateToken, validateBody(updateUserSchema), updateUser)
  .delete("/", authenticateToken, deleteUser)

export { usersRouter }
