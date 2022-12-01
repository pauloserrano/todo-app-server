import usersFactory from "@tests/factories/users.factory"
import supertest from "supertest"
import app from "../../src/app"

//const api = supertest(app)
beforeAll(async () => {
  await usersFactory.cleanDb()
})

describe("POST /users", () => {
  it("Should create a new user entity", async () => {
    const user = await usersFactory.createUser()

    expect(user).toEqual(expect.objectContaining({
      email: expect.any(String),
      name: expect.any(String),
      password: expect.any(String)
    }))
  })
})
