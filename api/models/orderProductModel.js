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

class orderProductModel {
    static async getAll() {
        const result = await pool.query('SELECT * FROM order_product');
        return result.rows;
    }
}

module.exports = orderProductModel;