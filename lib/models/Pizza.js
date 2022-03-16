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
    const { rows } = await pool.query(
      'INSERT INTO pizza(toppings, cheese) VALUES ($1, $2) RETURNING *;',
      [toppings, cheese]
    );
    const pizza = new Pizza(rows[0]);
    return pizza;
  }

  //   static async getById(id) {
  //     const { rows } = await pool.query(
  //       `
  //         SELECT
  //         *
  //         FROM
  //         pizza
  //         WHERE
  //         id=$1
  //         `,
  //       [id]
  //     );
  //     return new Pizza(rows[0]);
  //   }
};
