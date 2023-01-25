export * from "./user.schemas"
export * from "./auth.schemas"
export * from "./todo.schemas"

import Joi from "joi"

export const genericIdSchema = Joi.object<{ id: number }>({
  id: Joi.number().required()
})
