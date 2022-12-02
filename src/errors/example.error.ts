import { ApplicationError } from "@types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function exampleError(message?: string, details?: string[]): ApplicationError{
  return {
    name: "exampleError",
    message,
    details
  }
}
