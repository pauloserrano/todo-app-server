import jwt from "jsonwebtoken"
import { Request, Response, NextFunction as Next } from "express"
import { internalServerError, unauthorizedError } from "@errors"
import { sessionRepository } from "@repositories"
import { JWTPayload } from "@types"

export async function authenticateToken(req: Request, res: Response, next: Next){
  const auth = req.header("Authorization")

  try {
    if (!auth){
      throw unauthorizedError("No Authorization header")
    }
    
    if (!process.env.JWT_SECRET){
      throw internalServerError("Token could not be validated")
    }
    
    const token = auth.replace("Bearer ", "")
    const session = await sessionRepository.findSessionByToken(token)
    if (!session){
      throw unauthorizedError("User has no session")
    }
    
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload
    res.locals.userId = userId
    
    return next()
  } catch (error) {
    return next(error)
  }
}
