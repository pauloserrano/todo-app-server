import { Request, Response, NextFunction as Next } from "express"
import httpStatus from "http-status"
import usersService from "@services/users.service"

export async function getUsers(_req: Request, res: Response, errorHandler: Next) {
  try {
    const users = await usersService.getUsers()
    res.status(httpStatus.OK).send(users)
  } catch (error) {
    errorHandler(error)
  }
}

export async function getUserById(req: Request, res: Response, errorHandler: Next) {
  const { userId } = req.params

  try {
    const user = await usersService.getUserById(userId)
    res.status(httpStatus.OK).send(user)
  } catch (error) {
    errorHandler(error)
  }
}

export async function postUser(req: Request, res: Response, errorHandler: Next) {
  const { name, email, password } = req.body

  try {
    const user = await usersService.postUser({ name, email, password })
    res.status(httpStatus.CREATED).send(user)
  } catch (error) {
    errorHandler(error)
  }
}

export async function updateUser(req: Request, res: Response, errorHandler: Next) {
  const { userId } = res.locals

  try {
    const user = await usersService.updateUser(userId, req.body)
    res.status(httpStatus.OK).send({
      name: user.name,
      email: user.email
    })
  } catch (error) {
    errorHandler(error)
  }
}

export async function deleteUser(req: Request, res: Response, errorHandler: Next) {
  const { userId, token } = res.locals as Record<string, string>

  try {
    await usersService.deleteUser(userId, token)
    res.sendStatus(httpStatus.OK)
  } catch (error) {
    errorHandler(error)
  }
}
