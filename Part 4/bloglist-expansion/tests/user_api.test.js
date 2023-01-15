const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
})


describe('when creating a new user...', () => {
  test('if the username or password properties are missing from the request, it will return 400 bad request', async () => {
    const newUser1 = {
        username: 'GOAT',
        name: 'Arto Hellas',
    }

    await api
      .post('/api/users')
      .send(newUser1)
      .expect(400)

    const newUser2 = {
        name: 'Johan Liebhart',
        password: "Monster"
    }  

    await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)
  })
  test('if the username or password properties are shorter than 3 characters, it will return 400 bad request', async () => {
    const newUser1 = {
        username: 'GO',
        name: 'Arto Hellas',
        password: 'LANG'
    }

    await api
      .post('/api/users')
      .send(newUser1)
      .expect(400)

    const newUser2 = {
        username: "Monster",
        name: 'Johan Liebhart',
        password: "KT"
    }  

    await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)
  })
})

afterAll(() => {
    mongoose.connection.close()
})

