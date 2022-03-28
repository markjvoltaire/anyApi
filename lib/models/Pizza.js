const pizza = require('../controllers/pizza');
const pool = require('../utils/pool');

module.exports = class Pizza {
  id;
  toppings;
  cheese;

  constructor(row) {
    this.id = row.id;
    this.toppings = row.toppings;
    this.cheese = row.cheese;
  }

  static async createPizza({ toppings, cheese }) {
    console.log('toppings, cheese', toppings, cheese);
    const { rows } = await pool.query(
      'INSERT INTO pizza (toppings, cheese) VALUES ($1, $2) RETURNING *;',
      [toppings, cheese]
    );
    return new Pizza(rows[0]);
  }

  static async updatePizza(id, attributes) {
    const existingPizza = await Pizza.getById(id);
    const updatedAttributes = { ...existingPizza, ...attributes };
    const { toppings, cheese } = updatedAttributes;
    const { rows } = await pool.query(
      `UPDATE
      pizza
      SET
      toppings = $2, cheese = $3
      WHERE
      id=$1
      RETURNING
      *
      `,
      [id, toppings, cheese]
    );

    return new Pizza(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          pizza
          WHERE
          id=$1
          `,
      [id]
    );
    return new Pizza(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      pizza
      `
    );
    return rows.map((row) => new Pizza(row));
  }

  static async deletePizza(id) {
    const { rows } = await pool.query(
      'DELETE FROM pizza WHERE id=$1 RETURNING *',
      [id]
    );
    if (!rows[0]) return null;
    return new Pizza(rows[0]);
  }
};
