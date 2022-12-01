import express from "express"
import cors from "cors"
import setup from "@config"
setup()

import { usersRouter } from "@routes"

const app = express()
app
  .use(cors())
  .use(express.json())
  .use("/users", usersRouter)

export default app
