import { Router } from "express"
import { getUsers, getUserById, postUser, updateUser, deleteUser } from "@controllers/users.controller"
import { validateBody, validateParams } from "@middlewares"
import { updateUserSchema, userIdSchema, newUserSchema } from "@schemas"

const usersRouter = Router()

usersRouter
  .get("/", getUsers)
  .get("/:userId", validateParams(userIdSchema), getUserById)
  .post("/", validateBody(newUserSchema), postUser)
  .patch("/:userId", validateBody(updateUserSchema), validateParams(userIdSchema), updateUser) //TODO add authentication
  .delete("/:userId", validateParams(userIdSchema), deleteUser) //TODO add authentication

export { usersRouter }
