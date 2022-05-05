const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback();  
  await db.migrate.latest();    
});

// beforeEach(async () => {
//   await db('users').truncate()
// });

afterAll(async () => {
  await db.destroy();
});

test('make sure our environment is set correctly', () => {
  expect(process.env.NODE_ENV).toBe('testing');
});


describe('[POST] register user', () => {
    test('registering new user returns a status 201', async () => {
      let res = await request(server).post('/api/auth/register').send({ username: 'montana', password: 'ranch' });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id', 'username', 'password')
    })
    test('sending body without username or password returns error', async () => {
      res = await request(server).post('/api/auth/register').send({});
      expect(res.status).toBe(500);
    })
  });


describe('[POST] login user', () => {
    test('logging in user correctly responds with status 200', async () => {
      let res = await request(server).post('/api/auth/login').send({ username: 'montana', password: 'ranch' });
      expect(res.status).toBe(200);
    })
    test('sending body without username or password returns error', async () => {
      res = await request(server).post('/api/auth/login').send({});
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'username and password required')
    })
  });


