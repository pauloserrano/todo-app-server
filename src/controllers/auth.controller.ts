import authService from "@services/auth.service"
import { Request, Response, NextFunction as Next } from "express"
import httpStatus from "http-status"

export async function signIn(req: Request, res: Response, errorHandler: Next) {
  try {
    const data = await authService.signIn(req.body)
    res.status(httpStatus.OK).send(data)
  } catch (error) {
    errorHandler(error)
  }
}
