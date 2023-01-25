import Joi from "joi"
import { User } from "@prisma/client"

export const newUserSchema = Joi.object<Pick<User, "email" | "name" | "password">>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export const updateUserSchema = Joi.object<Partial<Omit<User, "id">> & { newPassword: string }>({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  newPassword: Joi.string()
})
