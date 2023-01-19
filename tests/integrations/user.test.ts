import supertest from "supertest"
import httpStatus from "http-status"
import jwt from "jsonwebtoken"
import app from "@src/app"
import { wipeDb } from "@tests/helpers"
import { authFactory, userFactory } from "@tests/factories"
import { faker } from "@faker-js/faker"

const api = supertest(app)

beforeAll(async () => {
  await wipeDb()
})

describe("GET /users", () => {
  it("[200] Should respond with an empty array if there are no users", async () => {
    await wipeDb()
    const response = await api.get("/users")

    expect(response.status).toBe(httpStatus.OK)
    expect(response.body).toEqual([])
  })

  it("[200] Should respond with an array of users", async () => {
    const user = await userFactory.createUser()
    const response = await api.get("/users")

    expect(response.status).toBe(httpStatus.OK)
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: user.name,
        email: user.email
      })
    ]))
  })
})

describe("GET /users/:userId", () => {
  it("[400] When given userId is invalid", async () => {
    const response = await api.get("/users/notavaliduseridohno")

    expect(response.status).toBe(httpStatus.BAD_REQUEST)
  })

  it("[404] When given userId does not exist", async () => {
    const response = await api.get(`/users/${faker.datatype.uuid()}`)

    expect(response.status).toBe(httpStatus.NOT_FOUND)
  })

  it("[200] Should respond with an user with the correct id", async () => {
    const user = await userFactory.createUser()
    const response = await api.get(`/users/${user.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: user.id,
      name: user.name,
      email: user.email
    })
  })
})

describe("POST /users", () => {
  it("[400] When body is invalid", async () => {
    const body = {}
    const response = await api.post("/users").send(body)

    expect(response.status).toBe(httpStatus.BAD_REQUEST)
  })

  describe("When body is valid", () => {
    it("[409] When email is already in use", async () => {
      const { email } = await userFactory.createUser()
      const { name, password } = userFactory.getMockUser()
      const body = { email, name, password }
      const response = await api.post("/users").send(body)

      expect(response.status).toBe(httpStatus.CONFLICT)
    })

    it("[201] Should create a new user", async () => {
      const user = userFactory.getMockUser()
      const response = await api.post("/users").send(user)

      expect(response.status).toBe(httpStatus.CREATED)
      expect(response.body).not.toHaveProperty("password")
      expect(response.body).toEqual({
        email: user.email,
        name: user.name
      })
    })
  })
})

describe("PATCH /users", () => {
  it("[400] When body is invalid", async () => {
    const token = await authFactory.createSession()
    const response = await api.post("/users").set("Authorization", `Bearer ${token}`).send({})

    expect(response.status).toBe(httpStatus.BAD_REQUEST)
  })

  describe("When body is valid", () => {
    const body = userFactory.getMockUser()

    it("[401] When no token was given", async () => {
      const response = await api.patch("/users").send(body)

      expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("[401] When given token is invalid", async () => {
      const response = await api.patch("/users").set("Authorization", "token").send(body)

      expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("[401] When given token has no related session", async () => {
      const { id: userId } = await userFactory.createUser()
      const token = jwt.sign({ userId }, process.env.JWT_SECRET)
      const response = await api.patch("/users").set("Authorization", `Bearer ${token}`).send(body)

      expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    })

    describe("When token is valid", () => {
      it("[200] Should respond with updated user data", async () => {
        const user = await userFactory.createUser()
        const token = await authFactory.createSession(user)
        const response = await api.patch("/users").set("Authorization", `Bearer ${token}`).send(body)

        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toEqual({
          email: body.email,
          name: body.name
        })
      })
    })
  })
})

describe("DELETE /users", () => {
  it("[401] When no token was given", async () => {
    const response = await api.delete("/users")

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  it("[401] When given token is invalid", async () => {
    const response = await api.delete("/users").set("Authorization", "token")

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  it("[401] When given token has no related session", async () => {
    const { id: userId } = await userFactory.createUser()
    const token = jwt.sign({ userId }, process.env.JWT_SECRET)
    const response = await api.delete("/users").set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

  describe("When token is valid", () => {
    it("[200] Should delete the user", async () => {
      const user = await userFactory.createUser()
      const token = await authFactory.createSession(user)
      const response = await api.delete("/users").set("Authorization", `Bearer ${token}`)
      const after = await api.get(`/users/${user.id}`)

      expect(response.status).toBe(httpStatus.OK)
      expect(after.status).toBe(httpStatus.NOT_FOUND)
    })
  })
})
