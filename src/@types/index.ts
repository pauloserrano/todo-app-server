export * from "./users.types"
export * from "./auth.types"

export type ApplicationError = {
  name: string,
  message?: string,
  details?: string[]
}
