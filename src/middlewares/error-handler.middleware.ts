import httpStatus from "http-status"
import { NextFunction, Request, Response } from "express"
import { ApplicationError } from "@types"
import { badRequestError, conflictError, internalServerError, JWTError, notFoundError, unauthorizedError } from "@errors"

export function handleApplicationErrors(error: ApplicationError, _req: Request, res: Response, _next: NextFunction) {
  console.log(error)
  switch (error.name) {
    case badRequestError().name:
      res.status(httpStatus.BAD_REQUEST).send(error)
      break
    case unauthorizedError().name:
      res.status(httpStatus.UNAUTHORIZED).send(error)
      break
    case JWTError().name:
      res.status(httpStatus.UNAUTHORIZED).send(error)
      break
    case notFoundError().name:
      res.status(httpStatus.NOT_FOUND).send(error)
      break
    case conflictError().name:
      res.status(httpStatus.CONFLICT).send(error)
      break
    case internalServerError().name:
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      break
  }
  res.sendStatus(httpStatus.BAD_REQUEST)
}
