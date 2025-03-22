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

class PerformanceModel {

  static async getByProduct(id_product) {
    const result = await pool.query(
      "select id_performances, average_resolution_low, fps_low, average_resolution_high, fps_high, p.id_game, id_product, name, picture_url from performances p inner JOIN game g on p.id_game = g.id_game where id_product = $1",
      [id_product]
    );
    return result.rows;
  }
}

module.exports = PerformanceModel;
