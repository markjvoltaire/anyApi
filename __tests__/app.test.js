const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Pizza = require('../lib/models/Pizza');

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

  it('should update a pizza', async () => {
    const pizza = await Pizza.createPizza({
      toppings: 'ham',
      cheese: 'pepper jack',
    });

    console.log('pizza', pizza);
    const expected = {
      id: expect.any(String),
      toppings: 'ham',
      cheese: 'mozerallia',
    };

    const response = await request(app)
      .patch('/api/v1/pizzas/1')
      .send({ cheese: 'mozerallia' });

    console.log('response', response);

    expect(response.body).toEqual(expected);
  });

  it('should get all pizzas', async () => {
    const expected = await Pizza.getAll();
    const res = await request(app).get('/api/v1/pizzas');

    expect(res.body).toEqual(expected);
  });

  it('should get pizza by id', async () => {
    const expected = await Pizza.getById(1);
    const res = await request(app).get(`/api/v1/pizzas/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('deletes a pizza by id', async () => {
    const expected = await Pizza.deletePizza(1);
    const res = await request(app).delete('/api/v1/pizzas/1');

    expect(expected).not.toContain(res.body);
  });
});
