import express from "express"
import cors from "cors"
import setup from "@config"
setup()

import { authRouter, userRouter, todoRouter } from "@routers"
import { handleApplicationErrors } from "@middlewares"

const app = express()
app
  .use(cors())
  .use(express.json())
  .use("/auth", authRouter)
  .use("/users", userRouter)
  .use("/todos", todoRouter)
  .use(handleApplicationErrors)

export default app
