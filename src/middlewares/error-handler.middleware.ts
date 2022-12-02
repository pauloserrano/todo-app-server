import { ApplicationError } from "@types"
import { NextFunction, Request, Response } from "express"
import { badRequestError, conflictError, internalServerError, notFoundError, unauthorizedError } from "@errors"
import httpStatus from "http-status"

export function handleApplicationErrors(error: ApplicationError, _req: Request, res: Response, _next: NextFunction){
  switch (error.name){
  case badRequestError().name:
    res.status(httpStatus.BAD_REQUEST).send(error)
    break
  case unauthorizedError().name:
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

  // eslint-disable-next-line no-console
  //console.error(error)
}
