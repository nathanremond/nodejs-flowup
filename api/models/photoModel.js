const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: true,
});

class PhotoModel {

  static async getByProduct(id_product) {
    const result = await pool.query(
      "select * from photos where id_product = $1",
      [id_product]
    );
    return result.rows;
  }
}

module.exports = PhotoModel;
