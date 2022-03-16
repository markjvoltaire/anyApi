const { Router } = require('express');
const Pizza = require('../models/Pizza');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  try {
    const newPizza = await Pizza.createPizza({
      toppings: req.body.toppings,
      cheese: req.body.cheese,
    });
    res.json(newPizza);
  } catch (error) {
    return null;
  }
});
