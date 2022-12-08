import { ApplicationError } from "@types"

export function JWTError(message?: string, details?: string[]): ApplicationError{
  return {
    name: "JsonWebTokenError",
    message,
    details
  }
}
