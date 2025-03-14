const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: true
});

class OrderModel {
  static async create({order_date}) {
    const result = await pool.query(
      "INSERT INTO orders (order_date) VALUES ($1) RETURNING *",
      [order_date]
    );
    return result.rows[0];
  }
}

module.exports = OrderModel;