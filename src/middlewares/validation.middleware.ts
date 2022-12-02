import { NextFunction as Next, Request, Response } from "express"
import httpStatus from "http-status"
import { ObjectSchema } from "joi"
import { badRequestError } from "@errors"

export function validateBody<T>(schema: ObjectSchema<T>) {
  return validate(schema, "body")
}

export function validateParams<T>(schema: ObjectSchema<T>) {
  return validate(schema, "params")
}

function validate(schema: ObjectSchema, type: "body" | "params") {
  return (req: Request, res: Response, next: Next) => {
    const { error } = schema.validate(req[type], { abortEarly: false })

    if (error) {
      const details = error.details.map(err => err.message)
      return res.status(httpStatus.BAD_REQUEST).send(badRequestError(`Invalid ${type}.`, details))
    }
    
    return next()
  }
}
