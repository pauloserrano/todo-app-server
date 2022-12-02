import { ApplicationError } from "@types"

export function unauthorizedError(message?: string, details?: string[]): ApplicationError{
  return {
    name: "UnauthorizedError",
    message,
    details
  }
}
