import { Request, Response, NextFunction as Next } from "express"
import httpStatus from "http-status"
import authService from "@src/services/auth.services"

export async function signIn(req: Request, res: Response, next: Next) {
  try {
    const data = await authService.signIn(req.body)
    res.status(httpStatus.OK).send(data)
  } catch (error) {
    next(error)
  }
}
