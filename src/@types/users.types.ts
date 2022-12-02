import { User } from "@prisma/client"

export type UserCreate = Omit<User, "id">

export type UserUpdate = Partial<UserCreate & { newPassword: User["password"] }>

export type UserLogin = Pick<User, "email" | "password">
