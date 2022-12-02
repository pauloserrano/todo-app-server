import { ApplicationError } from "@types"

export function conflictError(message?: string, details?: string[]): ApplicationError{
  return {
    name: "ConflictError",
    message,
    details
  }
}
