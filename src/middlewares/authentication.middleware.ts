import jwt from "jsonwebtoken"
import { Request, Response, NextFunction as Next } from "express"
import { unauthorizedError } from "@errors"
import { sessionRepository } from "@repositories"
import { JWTPayload } from "@types"

export async function authenticateToken(req: Request, res: Response, next: Next) {
  try {
    const auth = req.header("Authorization")
    if (!auth) {
      throw unauthorizedError("No Authorization header")
    }

    const token = auth.replace("Bearer ", "")
    if (!token) {
      throw unauthorizedError("No token")
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload

    const session = await sessionRepository.findSessionByToken(token)
    if (!session) {
      throw unauthorizedError("User has no session")
    }

    res.locals = {
      userId,
      token
    }

    return next()
  } catch (error) {
    return next(error)
  }
}
