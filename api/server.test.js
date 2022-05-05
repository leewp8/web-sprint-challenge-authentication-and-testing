const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')
const router = require('./auth/auth-router')


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
    let res = await request(router).post('/register').send({ username: 'montana', password: 'ranch' });
    expect(res.status).toBe(201);
    expect(res.message).toBe('welcome, montana')

    test('sending body without username or password returns error', async () => {
      res = await request(router).post('/register').send({});
      expect(res.status).toBe(500);
      expect(res.message).toBe('username and password required')
    })
  });
})


describe('[POST] login user', () => {
  test('logging in user correctly responds with status 200', async () => {
    let res = await request(router).post('/login').send({ username: 'montana', password: 'ranch' });
    expect(res.status).toBe(200);

    test('sending body without username or password returns error', async () => {
      res = await request(router).post('/register').send({});
      expect(res.status).toBe(500);
      expect(res.message).toBe('username and password required')
    })
  });
})

