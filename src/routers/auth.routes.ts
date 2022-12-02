import { Router } from "express"
import { signIn } from "@controllers/auth.controller"
import { validateBody } from "@middlewares"
import { signInSchema } from "@schemas"

const authRouter = Router()

authRouter
  .post("/signin", validateBody(signInSchema), signIn)

export { authRouter }
