import { ApplicationError } from "@types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function badRequestError(message?: string, details?: string[]): ApplicationError{
  return {
    name: "BadRequestError",
    message,
    details
  }
}
