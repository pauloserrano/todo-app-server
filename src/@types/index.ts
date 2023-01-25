export * from "./user.types"
export * from "./auth.types"
export * from "./todo.types"

export type ApplicationError = {
  name: string,
  message?: string,
  details?: string[]
}
