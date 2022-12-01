import { Request, Response } from "express"
import httpStatus from "http-status"
import usersService from "@services/users.service"

export async function getUsers(req: Request, res: Response){
  try {
    const users = await usersService.getUsers()
    res.status(httpStatus.OK).send(users)
  } catch (error) {
    res.sendStatus(httpStatus.BAD_REQUEST)
  }
}
