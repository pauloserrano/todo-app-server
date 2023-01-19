import supertest from "supertest"
import httpStatus from "http-status"
import app from "@src/app"
import { userFactory } from "@tests/factories"
import { wipeDb } from "@tests/helpers"

const api = supertest(app)

beforeAll(async () => {
  await wipeDb()
})

describe("POST /auth/signin", () => {
  it("[400] When body is invalid", async () => {
    const body = {}
    const response = await api.post("/auth/signin").send(body)

    expect(response.status).toBe(httpStatus.BAD_REQUEST)
  })

  describe("When body is valid", () => {
    it("[401] When email does not exist", async () => {
      const { email, password } = userFactory.getMockUser()
      const body = { email, password }
      const response = await api.post("/auth/signin").send(body)

      expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("[401] When password is invalid", async () => {
      const { email } = await userFactory.createUser()
      const { password } = userFactory.getMockUser()
      const body = { email, password }
      const response = await api.post("/auth/signin").send(body)

      expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("[200] Should respond with a session token and user data", async () => {
      const { email, password } = await userFactory.createUser()
      const body = { email, password }
      const response = await api.post("/auth/signin").send(body)

      expect(response.status).toBe(httpStatus.OK)
      expect(response.body.token).toBeDefined()
      expect(response.body.user).toEqual(expect.objectContaining({ email }))
    })
  })
})
