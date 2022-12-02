import { unauthorizedError } from "@errors"
import { Request, Response, NextFunction as Next } from "express"

export function authenticateToken(req: Request, _res: Response, next: Next){
  const auth = req.header("Authorization")

  if (!auth){
    throw unauthorizedError()
  }

  const token = auth.replace("Bearer ", "")
  if (!token){
    throw unauthorizedError()
  }

  return next()
}
