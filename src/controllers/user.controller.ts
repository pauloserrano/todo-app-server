import { Request, Response, NextFunction as Next } from "express"
import httpStatus from "http-status"
import userService from "@src/services/user.services"

export async function getUsers(_req: Request, res: Response, next: Next) {
  try {
    const users = await userService.getUsers()
    res.status(httpStatus.OK).send(users)
  } catch (error) {
    next(error)
  }
}

export async function getUserById(req: Request, res: Response, next: Next) {
  const { id } = req.params

  try {
    const user = await userService.getUserById(+id)
    res.status(httpStatus.OK).send(user)
  } catch (error) {
    next(error)
  }
}

export async function postUser(req: Request, res: Response, next: Next) {
  const { name, email, password } = req.body

  try {
    const user = await userService.postUser({ name, email, password })
    res.status(httpStatus.CREATED).send(user)
  } catch (error) {
    next(error)
  }
}

export async function updateUser(req: Request, res: Response, next: Next) {
  const { userId } = res.locals

  try {
    const user = await userService.updateUser(+userId, req.body)
    res.status(httpStatus.OK).send({
      name: user.name,
      email: user.email
    })
  } catch (error) {
    next(error)
  }
}

export async function deleteUser(_req: Request, res: Response, next: Next) {
  const { userId } = res.locals as Record<string, string>

  try {
    await userService.deleteUser(+userId)
    res.sendStatus(httpStatus.OK)
  } catch (error) {
    next(error)
  }
}
