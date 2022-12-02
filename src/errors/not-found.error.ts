import { ApplicationError } from "@types"

export function notFoundError(message?: string, details?: string[]): ApplicationError{
  return {
    name: "NotFoundError",
    message,
    details
  }
}
