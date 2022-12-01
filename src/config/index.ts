import { loadEnvs } from "./envs"
import { connectDb } from "./database"

export default function setup(){
  loadEnvs()
  connectDb()
}

export * from "./database"
export * from "./envs"
