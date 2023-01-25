import { Router } from "express"
import { getUsers, getUserById, postUser, updateUser, deleteUser } from "@src/controllers/user.controller"
import { authenticateToken, validateBody, validateParams } from "@middlewares"
import { updateUserSchema, newUserSchema, genericIdSchema } from "@schemas"

const userRouter = Router()

userRouter
  .get("/", getUsers)
  .get("/:id", validateParams(genericIdSchema), getUserById)
  .post("/", validateBody(newUserSchema), postUser)
  .patch("/", authenticateToken, validateBody(updateUserSchema), updateUser)
  .delete("/", authenticateToken, deleteUser)

export { userRouter }
