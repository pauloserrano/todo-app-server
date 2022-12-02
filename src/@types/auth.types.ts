import { Session } from "@prisma/client"

export type SessionCreate = Pick<Session, "token" | "userId">

export type JWTPayload = Pick<Session, "userId">
