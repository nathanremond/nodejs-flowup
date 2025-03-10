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

class BestSellsModel {
    static async getAll() {
        const result = await pool.query(
          "SELECT c.*, p.* FROM order_product c JOIN product p ON c.id_product = p.id_product WHERE c.id_product IN (SELECT id_product FROM order_product GROUP BY id_product HAVING COUNT(*) >= 5)"
        );
        return result.rows;
    }
}

module.exports = BestSellsModel;