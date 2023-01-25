import { Request, Response, NextFunction as Next } from "express"
import httpStatus from "http-status"
import todoServices from "@src/services/todo.services"

export async function getTodos(_req: Request, res: Response, next: Next) {
  const { userId } = res.locals

  try {
    const todos = await todoServices.getTodosByUserId(userId)
    res.status(httpStatus.OK).send(todos)
  } catch (error) {
    next(error)
  }
}

export async function postTodo(req: Request, res: Response, next: Next) {
  const { userId } = res.locals

  try {
    const todo = await todoServices.createTodo(userId, req.body)
    res.status(httpStatus.OK).send(todo)
  } catch (error) {
    next(error)
  }
}
