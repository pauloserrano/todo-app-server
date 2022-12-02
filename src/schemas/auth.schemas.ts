import Joi from "joi"
import { UserLogin } from "@types"

export const signInSchema = Joi.object<UserLogin>({
  email: Joi.string().required(),
  password: Joi.string().required()
})
