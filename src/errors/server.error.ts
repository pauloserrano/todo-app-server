import { ApplicationError } from "@types"

export function internalServerError(message?: string, details?: string[]): ApplicationError{
  return {
    name: "InternalServerError",
    message,
    details
  }
}
