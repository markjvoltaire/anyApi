const { Router } = require('express');
const Pizza = require('../models/Pizza');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    try {
      const newPizza = await Pizza.createPizza({
        toppings: req.body.toppings,
        cheese: req.body.cheese,
      });
      res.json(newPizza);
    } catch (error) {
      return null;
    }
  })

  .get('/:id', async (req, res) => {
    try {
      const pizza = await Pizza.getById(req.params.id);
      res.json(pizza);
    } catch (error) {
      return null;
    }
  })

  .patch('/:id', async (req, res) => {
    try {
      const changePizza = await Pizza.updatePizza(req.params.id, req.body);
      res.json(changePizza);
    } catch (error) {
      return null;
    }
  })

  .get('/', async (req, res) => {
    const pizzas = await Pizza.getAll();
    res.send(pizzas);
  });
