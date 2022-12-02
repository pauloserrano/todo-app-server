import { Session } from "@prisma/client"

export type SessionCreate = Pick<Session, "token" | "userId">
