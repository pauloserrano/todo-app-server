import express from "express"
import cors from "cors"
import setup from "@config"
setup()

import { authRouter, usersRouter } from "@routers"
import { handleApplicationErrors } from "@middlewares"

const app = express()
app
  .use(cors())
  .use(express.json())
  .use("/users", usersRouter)
  .use("/auth", authRouter)
  .use(handleApplicationErrors)

export default app
