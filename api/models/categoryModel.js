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

class CategoryModel {
    static async getAll() {
        const result = await pool.query('SELECT * FROM category');
        return result.rows;
    }

    static async getById(id) {
        const result = await pool.query(
            'SELECT * FROM category WHERE id_category = $1', 
            [id]
        )
        return result.rows[0]
    }
}

module.exports = CategoryModel;