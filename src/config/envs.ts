import dotenv from "dotenv"

export function loadEnvs(){
  if (!process.env.NODE_ENV) return dotenv.config()
  
  const path = ".env." + process.env.NODE_ENV
  dotenv.config({ 
    path, 
    override: true 
  })
}
