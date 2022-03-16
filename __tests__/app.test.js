const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('anyApi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('should create a pizza', async () => {
    const res = await request(app)
      .post('/api/v1/pizzas')
      .send({ toppings: 'beef', cheese: 'swiss cheese' });

    expect(res.body).toEqual({
      id: expect.any(String),
      toppings: 'beef',
      cheese: 'swiss cheese',
    });
  });
});
