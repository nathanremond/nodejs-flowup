const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: true,
});

class RequestModel {
  static async getByUser(id_user) {
    const result = await pool.query(
      "SELECT * FROM request WHERE id_user = $1",
      [id_user]
    );
    return result.rows;
  }

  static async create({
    name,
    phone,
    email,
    street,
    city,
    zipcode,
    country,
    buy_date,
    use,
    budget,
    message,
    id_user,
  }) {
    const result = await pool.query(
      "INSERT INTO request (name, phone, email, street, city, zipcode, country, buy_date, use, budget, message, id_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [
        name,
        phone,
        email,
        street,
        city,
        zipcode,
        country,
        buy_date,
        use,
        budget,
        message,
        id_user,
      ]
    );
    return result.rows[0];
  }
}

module.exports = RequestModel;