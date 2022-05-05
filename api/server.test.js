const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')
const authRouter = require('./auth/auth-router')


beforeAll(async () => {
  await db.migrate.rollback();  // npx knex migrate:rollback
  await db.migrate.latest();    // npx knex migrate:latest
});

beforeEach(async () => {
  await db('users').truncate()
  await db('users')
});

afterAll(async () => {
  await db.destroy();
});


describe('[POST] register user', () => {
  test('registering new user returns a status 201', async () => {
    let res = await request(authRouter).post('/register').send({ username: 'montana', password: 'ranch' });
    expect(res.status).toBe(201);

    test('sending body without username or password return error', async () => {
      res = await request(authRouter).post('/register').send({});
      expect(res.status).toBe(500);
      expect(res.message).toBe('username and password required')
    })
  });
})
